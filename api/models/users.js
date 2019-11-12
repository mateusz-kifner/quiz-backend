const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {
    type: String,
    require: true,
    unique: true,
    match: /^[a-z0-9_-]{4,16}$/
  },
  password: { type: String, require: true },
  email: {
    type: String,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
  },
  permission: { type: String, require: true },
  tokens: { type: [String] },
  scores: { type: Object, require: true }
});

module.exports = mongoose.model("User", userSchema);
