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
  top_level_category_name: {
    type: String,
    required: true
  },
  visible_tags_names: {
    type: [String ]
  },
  not_visible_tags_names: {
    type: [String ]
  },
  sub_category_names: {
    type: [String ],
    required: true
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
