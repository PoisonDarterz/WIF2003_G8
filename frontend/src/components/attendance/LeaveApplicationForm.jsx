import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUpload, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const LeaveApplicationForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("Sick");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeName || !employeeID || !department || !startDate || !endDate) {
      alert("Please fill in all the credentials");
      return;
    }

    const formData = new FormData();
    formData.append("employeeName", employeeName);
    formData.append("employeeID", employeeID);
    formData.append("department", department);
    formData.append("leaveType", leaveType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setEmployeeName("");
      setEmployeeID("");
      setDepartment("");
      setLeaveType("Sick");
      setStartDate(null);
      setEndDate(null);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="w-full text-left">
      <h3 className="text-lg font-semibold mt-8 mb-4 ml-4">
        Leave Application Form
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="flex flex-col ml-8 mt-8">
          <div className="mb-4">
            <label htmlFor="employeeName" className="block font-bold mb-2">
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="employeeID" className="block font-bold mb-2">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="block font-bold mb-2">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="leaveType" className="block font-bold mb-2">
              Type of Leave
            </label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded"
            >
              <option value="Sick">Sick</option>
              <option value="Vacation">Vacation</option>
              <option value="Medical Appointment">Medical Appointment</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-bold mb-2">
              Start Date
            </label>
            <div className="relative">
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select Start Date"
                className="w-64 px-3 py-2 border border-gray-300 rounded pl-10"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block font-bold mb-2">
              End Date
            </label>
            <div className="relative">
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select End Date"
                className="w-64 px-3 py-2 border border-gray-300 rounded pl-10"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block font-bold mb-2">
              Upload Relevant Document
            </label>
            <div>
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="w-64 px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              className="bg-[#EBB99E] hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded mt-2 w-64"
            >
              <FaUpload className="mr-2 inline-block" />
              Upload
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-[#2C74D8] text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
