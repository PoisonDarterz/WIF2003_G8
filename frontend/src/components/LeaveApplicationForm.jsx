import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaUpload, FaCalendarAlt } from "react-icons/fa";

const LeaveApplicationForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("Sick");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [file, setFile] = useState(null);
  const [leaveRecords, setLeaveRecords] = useState([]);

  useEffect(() => {
    const existingRecords =
      JSON.parse(localStorage.getItem("leaveRecords")) || [];
    setLeaveRecords(existingRecords);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeName || !employeeID || !department || !startDate || !endDate) {
      alert("Please fill in all the credentials");
      return;
    }

    const leaveRecord = {
      monthIssued: `${startDate.toLocaleString("default", {
        month: "long",
      })} ${startDate.getFullYear()}`,
      startDate: `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`,
      endDate: `${endDate.getDate()}/${
        endDate.getMonth() + 1
      }/${endDate.getFullYear()}`,
      leaveType: leaveType,
      status: "Pending",
      file: file,
    };

    const updatedRecords = [...leaveRecords, leaveRecord];
    updatedRecords.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
    localStorage.setItem("leaveRecords", JSON.stringify(updatedRecords));
    setLeaveRecords(updatedRecords);

    setEmployeeName("");
    setEmployeeID("");
    setDepartment("");
    setLeaveType("Sick");
    setStartDate(null);
    setEndDate(null);
    setFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFile(fileUrl);
    }
  };

  return (
    <div className="w-full">
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
                onChange={handleFileUpload}
                className="w-64 px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              className="bg-[#EBB99E] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded mt-2 w-64"
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
