const Quiz = require("../../models/quizzes");
const error = require("../../error");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        icon: "Puzzle_white.png"
    });
    quiz.save()
        .then(result => {
            res.status(201).json({
                message: "quiz Added",
                addedQuiz: quiz
            });
        })
        .catch(err => {
            return error("action create failed");
        });
};
