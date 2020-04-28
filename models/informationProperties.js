const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const informationPropertiesSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  bookmarks: {
    type: Number,
    required: true,
    default: 0,
  },
  importance: {
    type: Number,
    required: true,
  },
  daily_pick: {
    type: Boolean,
    required: true,
  },
  hide: {
    type: Boolean,
    required: true,
  },
  popular: {
    type: Boolean,
    required: true,
    default: true,
  },
  top_level_category_name: {
    type: String,
  },
  top_level_category_slug: {
    type: String,
  },
  visible_tags_names: {
    type: [String],
  },
  not_visible_tags_names: {
    type: [String],
  },
  sub_category_names: {
    type: [String],
  },
  video_sub_category: {
    type: String,
  },
});

module.exports = mongoose.model(
  "InformationProperties",
  informationPropertiesSchema
);
