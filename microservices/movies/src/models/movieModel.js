const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  idmovie: { type: String },
  description: { type: String },
  owner: { type: String },
  cover: { type: String },
  likes: { type: Number },
  messages: { type: Number },
  date_record: { type: String },
});

module.exports = mongoose.model("movie", movieSchema);
