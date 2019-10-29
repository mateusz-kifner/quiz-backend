const Quizzes = require("../../models/quizzes");

module.exports = (req, res, next) => {
  if (global.game_data == undefined) {
    global.game_data = {};
  }
  const id = req.params.quizId;
  if (id) {
    Quizzes.findById(id)
      .exec()
      .then(data => {
        const data_questions = JSON.parse(data.questions);
        const time_limit_questions = data_questions.map(question => {
          return parseInt(question.time_limit);
        });
        const answer_count = data_questions.map(question => {
          return parseInt(question.answers.length);
        });
        const time_limit = time_limit_questions.reduce((a, b) => a + b, 0);
        var game_data = {
          quiz: id,
          time_start: Date.now(),
          time_start_question: Date.now(),
          time_limit_questions: time_limit_questions,
          time_limit: time_limit,
          answers: data.answers,
          answer_count: answer_count,
          question_nr: 0,
          overall_score: 0
        };
        console.log("game_data", game_data);
        global.game_data[req.userJWT._id] = game_data;
        if (data) {
          res.status(200).json({
            game_quiz: game_data.quiz,
            game_start_time: game_data.time_start,
            game_time_limit_questions: game_data.time_limit_questions,
            next_question: game_data.question_nr
          });
        } else {
          res.status(404).json({});
        }
      })
      .catch(err => next(err));
  } else {
    res.status(404).json({});
  }
};
