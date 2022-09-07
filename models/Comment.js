const { Schema, model } = require("mongoose");

const CommentSchecma = new Schema({
  writtenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", CommentSchecma);

module.exports = Comment;
