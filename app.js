const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
mongoose.connect(
    "mongodb+srv://quiz-database:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0-ocpnn.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const quizzesRoutes = require("./api/routes/quizzes");
const scoresRoutes = require("./api/routes/scores");

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

app.use("/quizzes", quizzesRoutes);
app.use("/scores", scoresRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;
