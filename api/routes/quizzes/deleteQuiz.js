const Quiz = require("../../models/quizzes");

module.exports = (req, res, next) => {
  const id = req.params.quizId;
  Quiz.deleteOne({ _id: id })
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
};
