const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = Todo = mongoose.model("Todo", TodoSchema);
