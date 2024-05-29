const express = require("express");
const router = express.Router();
const multer = require("multer");
const LeaveApplication = require("../models/leave.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../leaveUploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to handle form submission
router.post("/apply", upload.single("file"), async (req, res) => {
  try {
    const {
      employeeName,
      employeeID,
      department,
      leaveType,
      startDate,
      endDate,
    } = req.body;
    const file = req.file ? req.file.path : null;

    // Get the current date for "month issued"
    const currentDate = new Date();
    const monthIssued = currentDate.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });

    const leaveApplication = new LeaveApplication({
      employeeName,
      employeeID,
      department,
      leaveType,
      startDate,
      endDate,
      file,
      monthIssued,
    });

    await leaveApplication.save();
    res
      .status(201)
      .json({ message: "Leave application submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all leave applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await LeaveApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
