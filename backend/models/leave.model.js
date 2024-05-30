const mongoose = require("mongoose");

const leaveApplicationSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },
    employeeID: { type: String, required: true },
    department: { type: String, required: true },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    file: { type: String },
    status: { type: String, default: "Pending" },
    monthIssued: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);
