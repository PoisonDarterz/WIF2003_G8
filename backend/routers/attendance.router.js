const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance.model");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

router.get("/attendances", authenticateUser, async (req, res) => {
  try {
    const records = await Attendance.find({
      employeeId: req.user.employeeID,
    }).sort({
      year: -1,
      month: -1,
      date: -1,
    });
    res.json(records);
  } catch (err) {
    console.error("Error fetching attendance records:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/clockin",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
    const { employeeID, reason } = req.body;
    const clockInTime = new Date();
    const hour = clockInTime.getHours();
    let status;
    let message;

    if (hour >= 20 || hour < 7) {
      status = "Absent";
      message =
        "You clock in outside the working hours (8am - 7pm), you are considered as Absent!";
    } else if (hour >= 12) {
      status = "Absent";
      message = "You clock in after 12pm, you are considered as Absent!";
    } else if (hour >= 8) {
      status = "Late";
      message = "You are Late!";
    } else if (hour >= 7) {
      status = "Present";
      message = "Clock in successfully!";
    }

    try {
      const existingRecord = await Attendance.findOne({
        employeeId: employeeID,
        year: clockInTime.getFullYear(),
        month: clockInTime.getMonth() + 1,
        date: clockInTime.getDate(),
      });

      if (existingRecord) {
        if (reason) {
          existingRecord.reason = reason;
          await existingRecord.save();
          res.status(200).json({
            record: existingRecord,
            message: "Reason updated successfully!",
          });
        } else {
          res
            .status(400)
            .json({ message: "You can't log in twice on the same day!" });
        }
      } else {
        const attendanceRecord = new Attendance({
          employeeId: employeeID,
          month: clockInTime.getMonth() + 1,
          date: clockInTime.getDate(),
          year: clockInTime.getFullYear(),
          clockIn: status === "Absent" ? "-" : clockInTime.toLocaleTimeString(),
          clockOut: "-",
          status: status,
          reason: reason || "",
        });

        const newRecord = await attendanceRecord.save();
        res.status(201).json({ record: newRecord, message: message });
      }
    } catch (err) {
      console.error("Error saving record:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/clockout",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
    const { employeeID } = req.body;
    const clockOutTime = new Date();
    const today = new Date();

    try {
      const todayRecord = await Attendance.findOne({
        employeeId: employeeID,
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
      });

      if (
        !todayRecord ||
        todayRecord.clockOut !== "-" ||
        todayRecord.status === "Absent"
      ) {
        res.status(400).json({ message: "Please clock in first!" });
      } else {
        todayRecord.clockOut = clockOutTime.toLocaleTimeString();
        const updatedRecord = await todayRecord.save();
        res.status(200).json(updatedRecord);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Endpoint to fetch all attendance records with pagination
router.get("/all", authenticateUser, checkRole("Admin"), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const records = await Attendance.find()
      .sort({ year: -1, month: -1, date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalRecords = await Attendance.countDocuments();
    res.json({
      records,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
