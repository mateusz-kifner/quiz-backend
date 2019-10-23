const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

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
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,Set-Cookie"
  );
  res.header("Access-Control-Allow-Credentials", "true");
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
const usersRoutes = require("./api/routes/users");

app.use("/images", express.static("images"));
app.use("/quizzes", quizzesRoutes);
app.use("/users", usersRoutes);

app.use((req, res, next) => {
  const err = { message: "error" };
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
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
