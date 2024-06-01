import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import axios from 'axios';

function TopNavBlack() {
  const [activeLink, setActiveLink] = useState('');
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Fetch user role from backend
    axios.get('http://localhost:5000/api/auth/user-role', { withCredentials: true })
      .then(response => {
        const role = response.data.role;
        setItems(navItems(role));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/attendance')) {
      setActiveLink('ATTENDANCE');
    } else if (location.pathname.startsWith('/salary')) {
      setActiveLink('SALARY');
    } else if (location.pathname.startsWith('/info')) {
      setActiveLink('INFORMATION');
    } else if (location.pathname.startsWith('/community')) {
      setActiveLink('COMMUNITY');
    } else if (location.pathname.startsWith('/helpdesk')) {
      setActiveLink('HELPDESK');
    } else if (location.pathname.startsWith('/home')) {
      setActiveLink('HOME');
    }
  }, [location]);

  return (
    <nav className="bg-black text-white flex justify-between items-center p-5 relative z-20">
      <Link to="/home">
        <img src="/LogoText.png" alt="Company Logo" className="h-12" />
      </Link>
      <div className="flex space-x-16">
        {items.map((item) => (
          <div className="relative group" key={item.title}>
            <Link to={item.link} className={activeLink === item.title.toUpperCase() ? 'font-bold text-[#EB4335]' : 'font-bold'} onClick={() => setActiveLink(item.title.toUpperCase())}>{item.title}</Link>
            {item.submenu && (
              <div className="absolute left-0 top-full w-48 rounded-md shadow-lg bg-black text-white z-10 hidden group-hover:block border-t-2 border-transparent">
                {item.submenu.map((subItem) => (
                  <Link to={subItem.link} className="block px-4 py-2 text-sm hover:text-[#EB4335]" onClick={() => setActiveLink(item.title.toUpperCase())} key={subItem.title}>{subItem.title}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Link to="/general/Profile">
          <img src="/Profile.png" alt="Profile" className="h-8 cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}

export default TopNavBlack;