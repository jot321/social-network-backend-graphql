const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoLinkSchema = new Schema({
  CMS_ID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  videoLink: {
    type: String,
    required: true,
  },
  playlistTitle: {
    type: String,
  },
  playlistId: {
    type: String,
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
