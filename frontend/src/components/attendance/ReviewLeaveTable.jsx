import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaTimesCircle, FaPauseCircle } from "react-icons/fa";
import axios from "axios";

const ReviewLeaveTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [leaveData, setLeaveData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/leave/all-applications",
          {
            withCredentials: true,
          }
        );
        const data = response.data;

        const filteredData = data.filter((item) => {
          const itemStartDate = new Date(item.startDate);
          const selectedMonth = startDate ? startDate.getMonth() : null;
          const selectedYear = startDate ? startDate.getFullYear() : null;
          return startDate
            ? itemStartDate.getMonth() === selectedMonth &&
                itemStartDate.getFullYear() === selectedYear
            : true;
        });

        setLeaveData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / entriesPerPage));
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, [startDate, entriesPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leave/application/${id}/status`,
        { status },
        { withCredentials: true }
      );
      setLeaveData((prevData) =>
        prevData.map((item) => (item._id === id ? { ...item, status } : item))
      );
      alert(`Leave application ${status.toLowerCase()}.`);
    } catch (error) {
      console.error(`Error updating leave status to ${status}:`, error);
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/application/${id}`,
        { withCredentials: true }
      );
      const application = response.data;
      if (application.file) {
        window.open(application.file, "_blank");
      } else {
        alert("No file attached to this leave application.");
      }
    } catch (error) {
      console.error("Error fetching leave application:", error);
    }
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = leaveData.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Attendance &nbsp;&nbsp;&#62;&nbsp;&nbsp; Review Leave Application
        </h2>
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="Select Month & Year"
            className="px-2 py-1 border border-gray-300 rounded w-50"
          />
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Employee ID</th>
            <th className="py-3 px-6 text-center">Employee Name</th>
            <th className="py-3 px-6 text-center">Start Date</th>
            <th className="py-3 px-6 text-center">End Date</th>
            <th className="py-3 px-6 text-center">Type of Leave</th>
            <th className="py-3 px-6 text-center">View Application</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentEntries.map((application, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-[#EAF3FF]"
              }`}
            >
              <td className="py-3 px-6 text-center">
                {application.employeeID}
              </td>
              <td className="py-3 px-6 text-center">
                {application.employeeName}
              </td>
              <td className="py-3 px-6 text-center">
                {new Date(application.startDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">
                {new Date(application.endDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">{application.leaveType}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-[#2C74D8] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleView(application._id)}
                >
                  View
                </button>
              </td>
              <td className="py-3 px-6 text-center flex justify-center items-center space-x-2">
                <FaCheckCircle
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => updateLeaveStatus(application._id, "Accepted")}
                />
                <FaTimesCircle
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => updateLeaveStatus(application._id, "Rejected")}
                />
                <FaPauseCircle
                  style={{ color: "#ed8332", cursor: "pointer" }}
                  onClick={() => updateLeaveStatus(application._id, "Pending")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-6">
        <button
          className={`px-4 py-2 text-sm text-white bg-gray-500 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 ml-2 text-sm ${
              currentPage === index + 1
                ? "text-white bg-[#2C74D8]"
                : "text-black bg-gray-300"
            } rounded`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewLeaveTable;
