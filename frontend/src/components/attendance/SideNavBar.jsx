import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navAttendance } from "../navAttendance";

const SideNavBar = () => {
  const location = useLocation();

  return (
    <div className="bg-[#B9DDDA] p-4 h-screen">
      <div className="font-bold mb-8 text-left text-black">Menu</div>
      <div className="space-y-6">
        {navAttendance.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center ${
              location.pathname === item.to ? "text-[#EB4335] font-bold" : "text-black"
            } hover:text-[#2C74D8]`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;