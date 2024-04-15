import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import './tailwind.css';

// General module routes
import Home from './pages/general/Home';
import Profile from './pages/general/Profile';
import LogIn from './pages/general/LogIn';

// Attendance module routes

// Community module routes

// Helpdesk module routes

// Info module routes

// Salary module routes
import ViewSalary from './pages/salary/ViewSalary';
import AdminSalary from './pages/salary/AdminSalary';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          {/* General module routes */}
          <Route path="/" element={<Home />} />
          
          {/* Attendance module routes */}

          {/* Community module routes */}

          {/* Helpdesk module routes */}

          {/* Info module routes */}

          {/* Salary module routes */}
          <Route path="/salary/view" element={<ViewSalary />} />
          <Route path="/salary/adminview" element={<AdminSalary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;