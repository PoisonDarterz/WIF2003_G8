const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedback.model");
const Field = require("../models/field.model");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

router.get("/", authenticateUser, checkRole("Admin"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ dateTimeCreated: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
  }
});

router.get("/fields", authenticateUser, async (req, res) => {
  try {
    const fields = await Field.find();
    res.json(fields);
  } catch (error) {
    console.error("Error fetching feedback fields:", error);
  }
});

router.post("/submitFeedback", authenticateUser, async (req, res) => {
  console.log("req.body.dateTimeCreated:", req.body.dateTimeCreated);
  try {
    const newFeedbackID = await generateID();
    const newFeedback = new Feedback({
      feedbackID: newFeedbackID,
      category: req.body.category,
      employeeID: req.user.employeeID,
      rating: req.body.rating,
      feedbackComment: req.body.feedbackComment,
      dateTimeCreated: req.body.dateTimeCreated,
    });

    const hold = await newFeedback.save();
    console.log("Feedback submitted successfully to mongodb");
    res.status(201).json(hold); // Send the created feedback as a response
  } catch (error) {
    console.error("Error submitting feedback: ", error);
  }
});

const generateID = async () => {
  const lastFeedback = await Feedback.findOne().sort({ feedbackID: -1 }).exec();
  let newID = "001";

  if (lastFeedback) {
    const lastFeedbackID = parseInt(lastFeedback.feedbackID, 10);
    newID = (lastFeedbackID + 1).toString().padStart(3, "0");
  }

  return newID;
};

module.exports = router;
