// models/community.model.js
const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  employee: {
    type: {id: String, name: String, profilePicURL: String},
    ref: "Employee.id",
    required: true,
  },
  replyTime: { type: Date, default: Date.now },
  replyText: { type: String, required: true },
});

const CommentSchema = new mongoose.Schema({
  employee: {
    type: {id: String, name: String, profilePicURL: String},
    ref: "Employee.id",
    required: true,
  },
  commentTime: { type: Date, default: Date.now },
  commentText: { type: String, required: true },
  replies: [ReplySchema],
});

const CommunitySchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    employee: {
        type: {id: String, name: String, profilePicURL: String},
        ref: "Employee.id",
        required: true,
    },
    postTime: { type: Date, default: Date.now },
    postImageSrc: { type: String },
    postCaption: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema],
});

module.exports = mongoose.model("Community", CommunitySchema);