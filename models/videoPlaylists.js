const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoLinkSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
});

const videoPlaylistsSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  byline: {
    type: String,
  },
  videoLinksB: {
    type: [videoLinkSchema],
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = {
  videoPlaylistsSchema: mongoose.model("VideoPlaylists", videoPlaylistsSchema),
  videoLinkSchema: mongoose.model("VideoLinks", videoLinkSchema),
};
