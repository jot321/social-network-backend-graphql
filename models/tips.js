const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tipsSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  top_level_category_name: {
    type: String,
    required: true
  },
  visible_tags_names: {
    type: [String]
  },
  not_visible_tags_names: {
    type: [String]
  },
  sub_category_names: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Tips", tipsSchema);
