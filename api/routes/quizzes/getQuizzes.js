const Quizzes = require("../../models/quizzes");
const error = require("../../error");

module.exports = (req, res, next) => {
    const id = req.params.userId;
    if (id) {
        Quizzes.findById(id)
            .select("")
            .exec()
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({
                        error: { message: "Users with given Id not found" }
                    });
                }
            })
            .catch(err =>
                res.status(500).json({
                    error: err
                })
            );
    } else {
        Quizzes.find()
            .select("_id login")
            .exec()
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    error("Database Error");
                }
            })
            .catch(err => error("Database Error"));
    }
};
