const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const informationPropertiesSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  shares: {
    type: Number,
    required: true
  },
  importance: {
    type: Number,
    required: true
  },
  daily_pick: {
    type: Boolean,
    required: true
  },
  hide: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model(
  "InformationProperties",
  informationPropertiesSchema
);
