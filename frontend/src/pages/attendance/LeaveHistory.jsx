import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import SideNavBar from "../../components/attendance/SideNavBar";
import LeaveHistoryTable from "../../components/attendance/LeaveHistoryTable";

const LeaveHistory = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBlack />
      <div className="flex flex-1">
        <SideNavBar />
        <div className="flex-1 p-4">
          <LeaveHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
