const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  url: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  date: { type: String },
});

const Meme = mongoose.model("Meme", memeSchema);

module.exports = Meme;
