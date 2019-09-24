const Quizzes = require("../../models/quizzes");
const error = require("../../error");

module.exports = (req, res, next) => {
    const id = req.params.quizId;
    if (id) {
        Quizzes.findById(id)
            .select("-owner -answers")
            .exec()
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    error("Quiz with given id does not exsists");
                }
            })
            .catch(err => error("action get failed"));
    } else {
        Quizzes.find()
            .select("_id title description icon")
            .exec()
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    error("Database Error");
                }
            })
            .catch(err => error("action get failed"));
    }
};
