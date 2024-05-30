// models/community.model.js
const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  replyTime: { type: Date, default: Date.now },
  replyText: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const CommentSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  commentTime: { type: Date, default: Date.now },
  commentText: { type: String, required: true },
  replies: [ReplySchema],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const CommunitySchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  postTime: { type: Date, default: Date.now },
  postImageSrc: { type: String },
  postCaption: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
});

module.exports = mongoose.model("Community", CommunitySchema);
