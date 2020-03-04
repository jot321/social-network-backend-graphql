const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shortArticleSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  byline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attachedImage: {
    type: String,
    required: true
  },
  category_name: {
    type: String,
    required: true
  },
  tags_name: {
    type: [String ]
  },
  likes: {
    type: Number,
    required: true
  },
  shares: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("ShortArticles", shortArticleSchema);
