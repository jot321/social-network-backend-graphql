const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const externalLinkSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  top_level_category_name: {
    type: String,
    required: true,
  },
  visible_tags_names: {
    type: [String],
  },
  not_visible_tags_names: {
    type: [String],
  },
  sub_category_names: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("ExternalLink", externalLinkSchema);
