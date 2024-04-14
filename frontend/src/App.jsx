import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import './tailwind.css';

// General module routes

// Attendance module routes

// Community module routes

// Helpdesk module routes

// Info module routes

// Salary module routes
import ViewSalary from './pages/salary/viewSalary';

function App() {
  return (
    <Router>
      <Routes>
        {/* General module routes */}

        {/* Attendance module routes */}

        {/* Community module routes */}

        {/* Helpdesk module routes */}

        {/* Info module routes */}

        {/* Salary module routes */}
        <Route path="/salary/view" element={<ViewSalary />} />
      </Routes>
    </Router>
  );
}

export default App;
