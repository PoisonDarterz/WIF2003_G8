import React from "react";
import TopNavBlack from "../../../components/TopNavBlack";
import SideNavBarAdmin from "../../../components/attendance/SideNavBarAdmin";
import AttendanceTableAdmin from "../../../components/attendance/AttendanceTableAdmin";

const AttendanceHistoryAdmin = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBlack />
      <div className="flex flex-1">
        <SideNavBarAdmin />
        <div className="flex-1 p-4">
          <AttendanceTableAdmin />
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistoryAdmin;
