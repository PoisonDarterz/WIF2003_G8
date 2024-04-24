import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import SideNavBar from "../../components/attendance/SideNavBar";
import LeaveApplicationForm from "../../components/attendance/LeaveApplicationForm";

const ApplyForLeave = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBlack />
      <div className="flex flex-1">
        <SideNavBar />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-0">
              Attendance &nbsp;&nbsp;&gt;&nbsp;&nbsp; Apply For Leave
            </h2>
          </div>
          <LeaveApplicationForm />
        </div>
      </div>
    </div>
  );
};

export default ApplyForLeave;
