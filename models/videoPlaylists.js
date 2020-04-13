const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoPlaylistsSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  videoLinks: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VideoPlaylists", videoPlaylistsSchema);
