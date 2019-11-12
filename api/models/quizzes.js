const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, require: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  icon_src: String,
  question_count: Number,
  questions: { type: Object },
  answers: { type: Object }
});

quizSchema.post("update", (err, doc, next) => {
  next(new Error({ error: "mongose", err }));
});

module.exports = mongoose.model("Quiz", quizSchema);
