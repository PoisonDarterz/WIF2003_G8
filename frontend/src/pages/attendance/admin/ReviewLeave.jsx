import React from "react";
import TopNavBlack from "../../../components/TopNavBlack";
import SideNavBarAdmin from "../../../components/SideNavBarAdmin";
import ReviewLeaveTable from "../../../components/ReviewLeaveTable";

const ReviewLeave = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBlack />
      <div className="flex flex-1">
        <SideNavBarAdmin />
        <div className="flex-1 p-4">
          <ReviewLeaveTable />
        </div>
      </div>
    </div>
  );
};

export default ReviewLeave;
