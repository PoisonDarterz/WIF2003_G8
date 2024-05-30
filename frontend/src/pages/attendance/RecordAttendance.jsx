import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import SideNavBar from "../../components/attendance/SideNavBar";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const RecordAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [canClockOut, setCanClockOut] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/clockin",
        { reason: reason }
      );

      const { record, message } = response.data;

      if (record && (record.status === "Present" || record.status === "Late")) {
        setCanClockOut(true);
      } else {
        setCanClockOut(false);
      }
      const userConfirmed = window.confirm(message);
      if (
        userConfirmed &&
        (record.status === "Late" || record.status === "Absent")
      ) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error clocking in:", error);
      alert(
        error.response?.data?.message || "An error occurred during clock-in."
      );
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/clockout"
      );
      console.log("Clock-out successful:", response.data);
    } catch (error) {
      console.error("Error clocking out:", error);
      alert(error.response.data.message);
    }
  };

  const handleReasonSubmit = async () => {
    if (!reason.trim()) {
      setReasonError(true);
      return;
    }
    setShowDialog(false);
    setReasonError(false);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/clockin",
        { reason: reason }
      );
      console.log("Reason submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting reason:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the reason."
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNavBlack />
      <div className="flex flex-1">
        <SideNavBar />
        <div className="flex-1 p-4">
          {/* Breadcrumb navigation */}
          <div className="flex justify-between items-center mb-4 p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance &nbsp;&nbsp;&gt;&nbsp;&nbsp; Record Attendance
            </h2>
          </div>
          {/* Clock display centered vertically */}
          <div className="flex-grow flex flex-col justify-center items-center mt-20">
            <div className="flex space-x-4 mb-4">
              {/* Hours square */}
              <div
                className="flex flex-col items-center justify-center bg-[#EBB99E] shadow-lg p-6 rounded-lg"
                style={{ width: "200px", height: "200px" }}
              >
                <span className="text-6xl font-semibold text-gray-800">
                  {currentTime.getHours().toString().padStart(2, "0")}
                </span>
                <span className="text-lg text-gray-800">Hours</span>
              </div>
              {/* Minutes square */}
              <div
                className="flex flex-col items-center justify-center bg-[#EBB99E] shadow-lg p-6 rounded-lg"
                style={{ width: "200px", height: "200px" }}
              >
                <span className="text-6xl font-semibold text-gray-800">
                  {currentTime.getMinutes().toString().padStart(2, "0")}
                </span>
                <span className="text-lg text-gray-800">Minutes</span>
              </div>
              {/* Seconds square */}
              <div
                className="flex flex-col items-center justify-center bg-[#EBB99E] shadow-lg p-6 rounded-lg"
                style={{ width: "200px", height: "200px" }}
              >
                <span className="text-6xl font-semibold text-gray-800">
                  {currentTime.getSeconds().toString().padStart(2, "0")}
                </span>
                <span className="text-lg text-gray-800">Seconds</span>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex space-x-4 mt-10">
              <button
                onClick={handleClockIn}
                className="bg-[#EBB99E] hover:bg-opacity-90 text-gray-800 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
                style={{ width: "200px" }}
              >
                Clock-in
              </button>
              <button
                onClick={handleClockOut}
                disabled={!canClockOut}
                className="bg-[#EBB99E] hover:bg-opacity-90 text-gray-800 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
                style={{ width: "200px" }}
              >
                Clock-out
              </button>
            </div>
          </div>
          <Dialog open={showDialog}>
            <DialogTitle>Reason for Being Late/Absent</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="reason"
                label="Reason"
                type="text"
                fullWidth
                variant="standard"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                error={reasonError}
                helperText={reasonError ? "Please state your reason" : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReasonSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RecordAttendance;
