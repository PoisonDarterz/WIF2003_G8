const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance.model");
const {
  authenticateUser,
  checkRole,
} = require("../middlewares/auth.middleware");

router.get("/", authenticateUser, async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.user._id }).sort({
      year: -1,
      month: -1,
      date: -1,
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/clockin",
  authenticateUser,
  checkRole("Employee"),
  async (req, res) => {
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
        employeeId: req.user._id,
        year: clockInTime.getFullYear(),
        month: clockInTime.getMonth() + 1,
        date: clockInTime.getDate(),
      });

      if (existingRecord) {
        if (req.body.reason) {
          existingRecord.reason = req.body.reason;
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
          employeeId: req.user._id,
          month: clockInTime.getMonth() + 1,
          date: clockInTime.getDate(),
          year: clockInTime.getFullYear(),
          clockIn: status === "Absent" ? "-" : clockInTime.toLocaleTimeString(),
          clockOut: "-",
          status: status,
          reason: req.body.reason || "",
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
    const clockOutTime = new Date();
    const today = new Date();

    try {
      const todayRecord = await Attendance.findOne({
        employeeId: req.user._id,
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

module.exports = router;
