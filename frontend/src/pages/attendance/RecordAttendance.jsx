import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import SideNavBar from "../../components/attendance/SideNavBar";

const RecordAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    const clockInTime = new Date();
    const existingRecords =
      JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    const today = new Date();
    const alreadyLoggedIn = existingRecords.some(
      (record) =>
        record.year === today.getFullYear() &&
        record.month === today.getMonth() + 1 &&
        record.date === today.getDate()
    );

    if (alreadyLoggedIn) {
      alert("You can't log in twice on the same day!");
      return;
    }

    // Check if the clock-in time is outside of working hours
    if (clockInTime.getHours() >= 21 || clockInTime.getHours() < 7) {
      alert(
        "Clock in Time not available. Please clock in within the working hours 8:00am - 5:00pm"
      );
      return;
    }

    const status =
      clockInTime.getHours() < 8
        ? "Present"
        : clockInTime.getHours() < 12
        ? "Late"
        : "Absent";

    const attendanceRecord = {
      month: clockInTime.getMonth() + 1,
      date: clockInTime.getDate(),
      year: clockInTime.getFullYear(),
      clockIn: clockInTime.toLocaleTimeString(),
      clockOut: "-",
      status: status,
    };

    existingRecords.push(attendanceRecord);
    localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords));
    window.dispatchEvent(new Event("storageUpdated"));
  };

  const handleClockOut = () => {
    const clockOutTime = new Date();
    const existingRecords =
      JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    const today = new Date();
    const todayRecord = existingRecords.find(
      (record) =>
        record.year === today.getFullYear() &&
        record.month === today.getMonth() + 1 &&
        record.date === today.getDate()
    );

    if (!todayRecord || todayRecord.clockOut !== "-") {
      alert("Please clock in first!");
      return;
    }

    todayRecord.clockOut = clockOutTime.toLocaleTimeString();
    localStorage.setItem("attendanceRecords", JSON.stringify(existingRecords));
    window.dispatchEvent(new Event("storageUpdated"));
  };

  // Todo: If the status is Absent, no need record clock-in and clock-out time

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
                className="bg-[#EBB99E] hover:bg-opacity-90 text-gray-800 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
                style={{ width: "200px" }}
              >
                Clock-out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordAttendance;
