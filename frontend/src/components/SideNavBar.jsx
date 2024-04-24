import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHistory,
  FaClipboardList,
  FaCalendarPlus,
  FaClipboardCheck,
  FaUserCog,
} from "react-icons/fa";

const SideNavBar = () => {
  return (
    <div className="bg-[#B9DDDA] p-4 h-screen">
      <div className="font-bold mb-8 text-left text-white">Menu</div>
      <div className="space-y-6">
        <NavLink
          to="/attendance/attendance-history"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-[#EB4335] font-bold" : ""
            }`
          }
          end
        >
          <FaHistory className="mr-2" />
          Attendance History
        </NavLink>
        <NavLink
          to="/attendance/record-attendance"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-red-600 font-bold" : ""
            }`
          }
          end
        >
          <FaClipboardList className="mr-2" />
          Record Attendance
        </NavLink>
        <NavLink
          to="/attendance/apply-leave"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-red-600 font-bold" : ""
            }`
          }
          end
        >
          <FaCalendarPlus className="mr-2" />
          Apply For Leave
        </NavLink>
        <NavLink
          to="/attendance/leave-history"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-red-600 font-bold" : ""
            }`
          }
          end
        >
          <FaClipboardCheck className="mr-2" />
          Leave History
        </NavLink>
        <NavLink
          to="/attendance/admin"
          className={({ isActive }) =>
            `flex items-center text-white hover:text-[#2C74D8] ${
              isActive ? "text-red-600 font-bold" : ""
            }`
          }
          end
        >
          <FaUserCog className="mr-2" />
          Admin Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavBar;
