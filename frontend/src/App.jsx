import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import './tailwind.css';

// General module routes
import Home from './pages/general/Home';
import Profile from './pages/general/Profile';
import LogIn from './pages/general/LogIn';
import ForgotPassword from './pages/general/ForgotPassword';
import SignUp from './pages/general/SignUp';
import ResetPassword from './pages/general/ResetPassword';

// Attendance module routes
import Attendance from "./pages/attendance/Attendance";

// Community module routes

// Helpdesk module routes

// Info module routes
import ViewEmployeeList from './pages/info/employeeList';
import ViewProfile from './pages/info/viewProfile';
import EditMyProfile from "./pages/info/editMyProfile";
import EditEmployeeProfile from "./pages/info/editEmployeeProfile";

// Salary module routes
import ViewSalary from './pages/salary/ViewSalary';
import AdminSalary from './pages/salary/AdminSalary';
import Benefits from './pages/salary/Benefits';
import ProcessSalary from './pages/salary/ProcessSalary';
import AssignBenefits from './pages/salary/AssignBenefits';

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
          <Route path="/attendance" element={<Attendance />} />

          {/* Community module routes */}

          {/* Helpdesk module routes */}

          {/* Info module routes */}
          <Route path="/info/employeeList" element={<ViewEmployeeList />} />
          <Route path="/info/viewProfile" element={<ViewProfile />} />
          <Route path="/info/editMyProfile" element={<EditMyProfile />} />
          <Route path="/info/editEmployeeProfile" element={<EditEmployeeProfile />} />

          {/* Salary module routes */}
          <Route path="/salary/view" element={<ViewSalary />} />
          <Route path="/salary/adminview" element={<AdminSalary />} />
          <Route path="/salary/benefits" element={<Benefits />} />
          <Route path="/salary/process" element={<ProcessSalary />} />
          <Route path="/salary/assign" element={<AssignBenefits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;