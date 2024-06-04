const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  feedbackID: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  feedbackComment: {
    type: String,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
