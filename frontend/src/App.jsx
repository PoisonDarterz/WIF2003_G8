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
import CommunityHomePage from './pages/community/CommunityHomePage';

// Helpdesk module routes
import Tickets from "./pages/helpdesk/MyTickets";
import Feedback from "./pages/helpdesk/Feedback";

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
import AddNewTicket from "./pages/helpdesk/AddNewTicket";
import ReviewTicket from "./pages/helpdesk/ReviewTicket";
import AllEmployeeTickets from "./pages/helpdesk/AllEmployeeTickets";
import ResolveTicket from "./pages/helpdesk/ResolveTicket";
import SubmitFeedback from "./pages/helpdesk/SubmitFeedback";

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
          <Route path="/community" element={<CommunityHomePage />} />
          
          {/* Helpdesk module routes */}
          <Route path="/helpdesk/" element={<Tickets />} />
          <Route path="/helpdesk/addNewTicket" element={<AddNewTicket />} />
          <Route path="/helpdesk/reviewTicket" element={<ReviewTicket />} />
          <Route path="/helpdesk/allEmployeeTickets" element={<AllEmployeeTickets />} />
          <Route path="/helpdesk/resolveTicket" element={<ResolveTicket />} />
          <Route path="/helpdesk/feedback" element={<Feedback />} />
          <Route path="/helpdesk/submitFeedback" element={<SubmitFeedback />} />

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