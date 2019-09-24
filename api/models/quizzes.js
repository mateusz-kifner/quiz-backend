const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, require: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    icon_src: String,
    question_count: 5,
    questions: { type: Array }
});

module.exports = mongoose.model("Quiz", quizSchema);
