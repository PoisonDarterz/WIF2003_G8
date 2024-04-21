import React from "react";
import AttendanceHistory from "./AttendanceHistory";
import RecordAttendance from "./RecordAttendance";
import ApplyForLeave from "./ApplyForLeave";
import LeaveHistory from "./LeaveHistory";
import { Routes, Route } from "react-router-dom";

const Attendance = () => {
  return (
    <Routes>
      <Route index element={<AttendanceHistory />} />
      <Route path="attendance-history" element={<AttendanceHistory />} />
      <Route path="record-attendance" element={<RecordAttendance />} />
      <Route path="apply-leave" element={<ApplyForLeave />} />
      <Route path="leave-history" element={<LeaveHistory />} />
    </Routes>
  );
};

export default Attendance;
