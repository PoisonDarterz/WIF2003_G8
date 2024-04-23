import React from "react";
import { NavLink } from "react-router-dom";
import { FaClipboardList, FaColumns } from "react-icons/fa";

const SideNavBar = () => {
  return (
    <div className="bg-[#B9DDDA] p-4 h-screen">
      <div className="font-bold mb-8 text-left text-white">Menu</div>
      <div className="space-y-6">
        <NavLink
          to="/attendance/admin/review-leave"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-[#EB4335] font-bold" : ""
            }`
          }
          end
        >
          <FaClipboardList className="mr-2" />
          Review Leave
        </NavLink>
        <NavLink
          to="/attendance/admin/attendance-history-admin"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-red-600 font-bold" : ""
            }`
          }
          end
        >
          <FaColumns className="mr-2" />
          Attendance History
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavBar;
