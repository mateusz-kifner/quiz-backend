const Users = require("../../models/users");

module.exports = (req, res, next) => {
  if (global.game_data == undefined) {
    global.game_data = {};
  }
  const game_data = global.game_data[req.userJWT._id];
  let overall_score = 0;
  if (
    typeof game_data !== "undefined" &&
    typeof game_data.question_nr !== "undefined" &&
    game_data.time_start + (game_data.time_limit + 5) * 1000 > Date.now()
  ) {
    const correct_amount = game_data.answers[game_data.question_nr].length;
    if (
      game_data.time_start_question +
        game_data.time_limit_questions[game_data.question_nr] * 1000 >
      Date.now()
    ) {
      let answer_table = Array(game_data.answer_count[game_data.question_nr]);
      for (let ans of game_data.answers) {
        for (
          let i = 0;
          i < game_data.answer_count[game_data.question_nr];
          i++
        ) {
          if (ans == i) answer_table[i] = true;
          else answer_table[i] = false;
        }
      }
      let correct = 0;
      let wrong = 0;
      for (let i = 0; i < game_data.answer_count[game_data.question_nr]; i++) {
        let answer_given = false;
        for (let ans of req.body.answer) {
          if (ans == i) {
            answer_given = true;
          }
        }
        if (answer_table[i] && answer_given) correct++;
        if (!answer_table[i] && answer_given) wrong++;
      }
      overall_score = correct - wrong < 0 ? 0 : correct - wrong;
    }

    game_data.overall_score += overall_score;
    game_data.time_start_question = Date.now();
    if (game_data.answers.length - 1 > game_data.question_nr) {
      game_data.question_nr++;
      res.status(200).json({
        answer: game_data.answers[game_data.question_nr],
        score: overall_score,
        overall_score: game_data.overall_score,
        max_score: correct_amount,
        next_question: game_data.question_nr
      });
    } else {
      game_data.question_nr = undefined;
      Users.findById(req.userJWT._id)
        .select("scores")
        .exec()
        .then(scores => {
          let update = scores.scores;
          if (typeof update[game_data.quiz] !== "undefined") {
            if (update[game_data.quiz] < game_data.overall_score)
              update[game_data.quiz] = game_data.overall_score;
          } else {
            update[game_data.quiz] = game_data.overall_score;
          }

          Users.updateOne(
            { _id: req.userJWT._id },
            { scores: update },
            { upsert: true }
          )
            .exec()
            .then(data => {
              res.status(200).json({
                answer: game_data.answers[game_data.question_nr],
                score: overall_score,
                overall_score: game_data.overall_score,
                max_score: correct_amount,
                next_question: null,
                debug_data: data
              });
            })
            .catch(err => {
              res
                .status(500)
                .json({ message: "saving failed updated", error: err });
            });
        })
        .catch(err => next(err));
    }
    console.log(game_data);
    return;
  }
  res.status(200).json({ next_question: null });
};
