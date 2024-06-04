const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedback.model");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

router.get("/", authenticateUser, checkRole("Admin"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
  }
});

router.post(
  "/submitFeedback",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
    console.log("req.body:", req.body);
    try {
      const newFeedback = new Feedback({
        feedbackID: req.body.feedbackID,
        category: req.body.category,
        employeeID: req.user.employeeID,
        rating: req.body.rating,
        feedbackComment: req.body.feedbackComment,
      });
      await newFeedback
        .save()
        .then(() => console.log("Feedback submitted successfully to mongodb"))
        .catch((error) =>
          console.error("Error create new feedback at mongodb: ", error)
        );
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  }
);

module.exports = router;
