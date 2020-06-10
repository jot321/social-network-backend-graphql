const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  bookmarkedPosts: {
    type: [String],
  },
  expert: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
