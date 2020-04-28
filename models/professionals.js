const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  eventPhoto: {
    type: String,
  },
  time: {
    type: String,
  },
  detailsLink: {
    type: String,
  },
});

const classSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timings: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const professionalsSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facebookLink: {
    type: String,
  },
  websiteLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  carouselPhotos: {
    type: [String],
    required: true,
  },
  videoLink: {
    type: String,
  },
  categories: {
    type: [String],
  },
  events: {
    type: [eventSchema],
  },
  classes: {
    type: [classSchema],
  },
});

module.exports = mongoose.model("Professionals", professionalsSchema);
