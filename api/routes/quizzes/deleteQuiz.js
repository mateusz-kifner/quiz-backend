const Quizzes = require("../../models/quizzes");
const error = require("../../error");

module.exports = (req, res, next) => {
    const id = req.params.userId;
    Quizzes.deleteOne({ _id: id })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(500).json({ error: err }));
};
