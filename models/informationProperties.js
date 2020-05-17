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
});

module.exports = mongoose.model(
  "InformationProperties",
  informationPropertiesSchema
);
