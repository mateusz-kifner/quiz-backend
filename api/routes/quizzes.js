const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwt-auth");

const createQuiz = require("../routes/quizzes/createQuiz");
const deleteQuiz = require("../routes/quizzes/deleteQuiz");
const patchQuiz = require("../routes/quizzes/patchQuiz");
const getQuiz = require("../routes/quizzes/getQuiz");

router.get("/", getQuiz);
router.get("/:quizId", jwtAuth.permission(), getQuiz);
router.post("/", jwtAuth.permission(), createQuiz);
router.delete("/:quizId", jwtAuth.permission(), deleteQuiz);
router.patch("/:quizId", jwtAuth.permission(), patchQuiz);

module.exports = router;
