import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const AttendanceDetailsModal = ({ open, onClose, attendance }) => {
  if (!attendance) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Attendance Details</DialogTitle>
      <DialogContent>
        <p>
          <strong>Month Issued:</strong>{" "}
          {new Date(attendance.year, attendance.month - 1).toLocaleString(
            "default",
            { month: "long", year: "numeric" }
          )}
        </p>
        <p>
          <strong>Date Issued:</strong>{" "}
          {`${attendance.date}/${attendance.month}/${attendance.year}`}
        </p>
        <p>
          <strong>Clock-in Time:</strong> {attendance.clockIn}
        </p>
        <p>
          <strong>Clock-out Time:</strong> {attendance.clockOut}
        </p>
        <p>
          <strong>Status:</strong> {attendance.status}
        </p>
        {attendance.reason && (
          <p>
            <strong>Reason:</strong> {attendance.reason}
          </p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceDetailsModal;
