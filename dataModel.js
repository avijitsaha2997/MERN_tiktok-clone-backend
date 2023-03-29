import mongoose from "mongoose";

const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});

const TiktokVideos = mongoose.model("tiktokVideos", tiktokSchema);
export default TiktokVideos;
