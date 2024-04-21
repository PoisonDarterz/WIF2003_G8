import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
<<<<<<< HEAD:src/components/TopNavBlack.jsx

function TopNavBlack() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveLink("HOME");
    } else if (location.pathname.startsWith("/attendance")) {
      setActiveLink("ATTENDANCE");
    } else if (location.pathname.startsWith("/salary")) {
      setActiveLink("SALARY");
    } else if (location.pathname === "/info") {
      setActiveLink("INFORMATION");
    } else if (location.pathname === "/community") {
      setActiveLink("COMMUNITY");
    } else if (location.pathname === "/helpdesk") {
      setActiveLink("HELPDESK");
=======
import { navItems } from "./navItems";

function TopNavBlack() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/attendance') {
      setActiveLink('ATTENDANCE');
    } else if (location.pathname.startsWith('/salary')) {
      setActiveLink('SALARY');
    } else if (location.pathname === '/info') {
      setActiveLink('INFORMATION');
    } else if (location.pathname === '/community') {
      setActiveLink('COMMUNITY');
    } else if (location.pathname === '/helpdesk') {
      setActiveLink('HELPDESK');
    } else if (location.pathname === '/') {
      setActiveLink('HOME');
>>>>>>> cd873d2d5caf4efa4f6f49249bb6081b2fe10863:frontend/src/components/TopNavBlack.jsx
    }
  }, [location]);

  return (
    <nav className="bg-black text-white flex justify-between items-center p-5 relative z-20">
      <Link to="/">
        <img src="/LogoText.png" alt="Company Logo" className="h-12" />
      </Link>
<<<<<<< HEAD:src/components/TopNavBlack.jsx
      <div className="space-x-16">
        <Link
          to="/"
          className={
            activeLink === "HOME" ? "font-bold text-[#EB4335]" : "font-bold"
          }
          onClick={() => setActiveLink("HOME")}
        >
          HOME
        </Link>
        <Link
          to="/attendance"
          className={
            activeLink === "ATTENDANCE"
              ? "font-bold text-[#EB4335]"
              : "font-bold"
          }
          onClick={() => setActiveLink("ATTENDANCE")}
        >
          ATTENDANCE
        </Link>
        <Link
          to="/salary/view"
          className={
            activeLink === "SALARY" ? "font-bold text-[#EB4335]" : "font-bold"
          }
          onClick={() => setActiveLink("SALARY")}
        >
          SALARY
        </Link>
        <Link
          to="/info"
          className={
            activeLink === "INFORMATION"
              ? "font-bold text-[#EB4335]"
              : "font-bold"
          }
          onClick={() => setActiveLink("INFORMATION")}
        >
          EMPLOYEE INFORMATION
        </Link>
        <Link
          to="/community"
          className={
            activeLink === "COMMUNITY"
              ? "font-bold text-[#EB4335]"
              : "font-bold"
          }
          onClick={() => setActiveLink("COMMUNITY")}
        >
          COMMUNITY
        </Link>
        <Link
          to="/helpdesk"
          className={
            activeLink === "HELPDESK" ? "font-bold text-[#EB4335]" : "font-bold"
          }
          onClick={() => setActiveLink("HELPDESK")}
        >
          HELPDESK
        </Link>
      </div>
      <div>
        <Link to="/general/Profile">
          <img
            src="/Profile.png"
            alt="Profile"
            className="h-8 cursor-pointer"
          />
=======
      <div className="flex space-x-16">
        {navItems.map((item) => (
          <div className="relative group" key={item.title}>
            <Link to={item.link} className={activeLink === item.title.toUpperCase() ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink(item.title.toUpperCase())}>{item.title}</Link>
            {item.submenu && (
              <div className="absolute left-0 top-full w-48 rounded-md shadow-lg bg-black text-white z-10 hidden group-hover:block border-t-2 border-transparent">
                {item.submenu.map((subItem) => (
                  <Link to={subItem.link} className="block px-4 py-2 text-sm" onClick={() => setActiveLink(item.title.toUpperCase())} key={subItem.title}>{subItem.title}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Link to="/general/Profile">
          <img src="/Profile.png" alt="Profile" className="h-8 cursor-pointer" />
>>>>>>> cd873d2d5caf4efa4f6f49249bb6081b2fe10863:frontend/src/components/TopNavBlack.jsx
        </Link>
      </div>
    </nav>
  );
}

export default TopNavBlack;
