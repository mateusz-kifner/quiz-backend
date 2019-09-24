const Quiz = require("../../models/quizzes");
const error = require("../../error");

module.exports = (req, res, next) => {
    const id = req.params.quizId;
    Quiz.deleteOne({ _id: id })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => error("action delete quiz failed"));
};
