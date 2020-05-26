const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  CMS_ID: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

module.exports = mongoose.model("Question", questionSchema);
