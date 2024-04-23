import React from "react";
import ReviewLeave from "./ReviewLeave";
import { Routes, Route } from "react-router-dom";
import AttendanceHistoryAdmin from "./AttendanceHistoryAdmin";

const Attendance = () => {
  return (
    <Routes>
      <Route index element={<AttendanceHistoryAdmin />} />
      <Route path="review-leave" element={<ReviewLeave />} />
    </Routes>
  );
};

export default Attendance;
