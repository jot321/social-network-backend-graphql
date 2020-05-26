const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  userName: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  replies: {
    type: [String],
  },
  writtenByGuest: {
    type: Boolean,
    default: false,
  },
  writtenByExpert: {
    type: Boolean,
    default: false,
  },
});

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
    default: 0,
  },
  shares: {
    type: Number,
    required: true,
    default: 0,
  },
  bookmarks: {
    type: Number,
    required: true,
    default: 0,
  },
  expertComments: {
    type: [commentsSchema],
    default: [],
  },
  expertCommentsCount: {
    type: Number,
    default: 0,
  },
  discussionsCount: {
    type: Number,
    default: 0,
  },
  topComments: {
    type: [commentsSchema],
    default: [],
  },
  importance: {
    type: Number,
    default: 0,
  },
  daily_pick: {
    type: Boolean,
    required: true,
    default: false,
  },
  hide: {
    type: Boolean,
    required: true,
    default: false,
  },
  popular: {
    type: Boolean,
    required: true,
    default: true,
  },
  top_level_category_name: {
    type: String,
    default: "",
  },
  top_level_category_slug: {
    type: String,
    default: "",
  },
  visible_tags_names: {
    type: [String],
    default: [],
  },
  not_visible_tags_names: {
    type: [String],
    default: [],
  },
  sub_category_names: {
    type: [String],
    default: [],
  },
  groups: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model(
  "InformationProperties",
  informationPropertiesSchema
);
