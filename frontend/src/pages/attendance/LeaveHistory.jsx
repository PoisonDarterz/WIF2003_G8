import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import SideNavBar from "../../components/SideNavBar";
import LeaveHistoryTable from "../../components/LeaveHistoryTable";

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
