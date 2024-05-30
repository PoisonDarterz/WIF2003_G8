const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  date: { type: Number, required: true },
  year: { type: Number, required: true },
  clockIn: { type: String, required: true },
  clockOut: { type: String, required: true },
  status: { type: String, required: true },
  reason: { type: String, default: "" },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
