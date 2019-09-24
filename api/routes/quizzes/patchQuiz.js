const Quizzes = require("../../models/quizzes");
const error = require("../../error");

module.exports = (req, res, next) => {
    const id = req.params.quizId;
    const update = {};
    for (const data of req.body) {
        update[data.key] = data.value;
    }
    Quizzes.update({ _id: id }, { $set: update })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => error("action patch quiz failed"));
};
