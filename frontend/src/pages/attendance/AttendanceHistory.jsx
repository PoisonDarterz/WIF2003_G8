import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import SideNavBar from "../../components/attendance/SideNavBar";
import AttendanceHistoryTable from "../../components/attendance/AttendanceHistoryTable";

const AttendanceHistory = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBlack />
      <div className="flex flex-1">
        <SideNavBar />
        <div className="flex-1 p-4">
          <AttendanceHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
