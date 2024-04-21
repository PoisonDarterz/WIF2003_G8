import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "./tailwind.css";

// General module routes
import Home from './pages/general/Home';
import Profile from './pages/general/Profile';
import LogIn from './pages/general/LogIn';
import ForgotPassword from './pages/general/ForgotPassword';
import SignUp from './pages/general/SignUp';
import ResetPassword from './pages/general/ResetPassword';

// Attendance module routes
// import Attendance from "./pages/attendance/Attendance";

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
          <Route path="/general/Profile" element={<Profile />} />
          <Route path="/general/LogIn" element={<LogIn />} />
          <Route path="/general/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/general/SignUp" element={<SignUp />} />
          <Route path="/general/ResetPassword" element={<ResetPassword />} />

          
          {/* Attendance module routes */}
          <Route path="/attendance/*" element={<Attendance />} />

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