const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.port || 3000;

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("test");
});

app.listen(port);
