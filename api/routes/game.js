const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwt-auth");

const start = require("./games/start");
const submitAnswer = require("./games/submitAnswer");

router.get("/:quizId", jwtAuth.permission(), start);
router.post("/submit", jwtAuth.permission(), submitAnswer);

module.exports = router;
