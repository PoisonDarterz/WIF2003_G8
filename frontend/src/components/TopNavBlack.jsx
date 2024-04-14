import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNavBlack() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/attendance') {
      setActiveLink('ATTENDANCE');
    } else if (location.pathname.startsWith('/salary')) {
      setActiveLink('SALARY');
    }  else if (location.pathname === '/info') {
      setActiveLink('INFORMATION');
    } else if (location.pathname === '/community') {
      setActiveLink('COMMUNITY');
    } else if (location.pathname === '/helpdesk') {
      setActiveLink('HELPDESK');
    } else if (location.pathname === '/') {
      setActiveLink('HOME');
    }
  }, [location]);

  return (
    <nav className="bg-black text-white flex justify-between items-center p-5">
      <Link to="/">
        <img src="/LogoText.png" alt="Company Logo" className="h-12" />
      </Link>
      <div className="space-x-16">
        <Link to="/" className={activeLink === 'HOME' ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink('HOME')}>HOME</Link>
        <Link to="/" className={activeLink === 'ATTENDANCE' ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink('ATTENDANCE')}>ATTENDANCE</Link>
        <Link to="/" className={activeLink === 'SALARY' ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink('SALARY')}>SALARY</Link>
        <Link to="/" className={activeLink === 'INFORMATION' ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink('INFORMATION')}>EMPLOYEE INFORMATION</Link>
        <Link to="/" className={activeLink === 'COMMUNITY' ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink('COMMUNITY')}>COMMUNITY</Link>
        <Link to="/" className={activeLink === 'HELPDESK' ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink('HELPDESK')}>HELPDESK</Link>
      </div>
      <div>
        <img src="/Profile.png" alt="Profile" className="h-8" />
      </div>
    </nav>
  );
}

export default TopNavBlack;