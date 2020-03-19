const mongoose = require("mongoose")

const Todo = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("todo", Todo)