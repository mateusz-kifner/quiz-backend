const Quizzes = require("../../models/quizzes");
const error = require("../../error");

module.exports = (req, res, next) => {
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title
    });
    quiz.save()
        .then(result => {
            res.status(201).json({
                message: "quiz Added",
                addedQuiz: quiz
            });
        })
        .catch(err => {
            return error("Quiz creation Error");
        });
};
