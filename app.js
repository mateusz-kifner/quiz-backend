const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const error = require("./api/error");

const app = express();
app.disable("x-powered-by");

mongoose.connect(
    "mongodb+srv://quiz-database:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0-ocpnn.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT , POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }
    next();
});

const quizzesRoutes = require("./api/routes/quizzes");
const scoresRoutes = require("./api/routes/scores");
const usersRoutes = require("./api/routes/users");

app.use("/quizzes", quizzesRoutes);
app.use("/scores", scoresRoutes);
app.use("/users", usersRoutes);

app.use((req, res, next) => {
    next(error("Not found"), 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (
        err.data == undefined ||
        (err.data.constructor === Object && Object.keys(err.data).length === 0)
    ) {
        res.json({
            error: {
                message: err.message
            }
        });
    } else {
        res.json({
            error: {
                message: err.message,
                data: err.data
            }
        });
    }
});

module.exports = app;
