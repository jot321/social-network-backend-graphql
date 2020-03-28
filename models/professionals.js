const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timingsSchema = new Schema({
  dayOfWeek: {
    type: String,
    required: true
  },
  timeOfDay: {
    type: String,
    required: true
  }
});

const coursesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const professionalsSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  facebookLink: {
    type: String,
    required: true
  },
  instagramLink: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  categories: {
    type: [String]
  },
  timings: {
    type: [timingsSchema]
  },
  courses: {
    type: [coursesSchema]
  }
});

module.exports = mongoose.model("Professionals", professionalsSchema);
