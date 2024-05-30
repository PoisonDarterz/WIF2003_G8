import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AttendanceDetailsModal from "../attendance/AttendanceDetailsModal";

const AttendanceHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/attendance"
        );
        console.log("Fetched data:", response.data);
        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.year, a.month - 1, a.date);
          const dateB = new Date(b.year, b.month - 1, b.date);
          return dateB - dateA;
        });
        setAttendanceData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = attendanceData.filter((data) => {
    if (selectedDate) {
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedYear = selectedDate.getFullYear();
      return data.month === selectedMonth && data.year === selectedYear;
    }
    return true;
  });

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleViewClick = (attendance) => {
    setSelectedAttendance(attendance);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Attendance &nbsp;&nbsp;&#62;&nbsp;&nbsp; Attendance History
        </h2>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Select Month & Year"
            className="px-2 py-1 border border-gray-300 rounded w-50"
          />
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Month Issued</th>
            <th className="py-3 px-6 text-center">Date Issued</th>
            <th className="py-3 px-6 text-center">Clock-in Time</th>
            <th className="py-3 px-6 text-center">Clock-out Time</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">View Attendance</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentEntries.map((data, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-[#EAF3FF]"
              }`}
            >
              <td className="py-3 px-6 text-center">
                {new Date(data.year, data.month - 1).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="py-3 px-6 text-center">
                {formatDate(new Date(data.year, data.month - 1, data.date))}
              </td>
              <td className="py-3 px-6 text-center">{data.clockIn}</td>
              <td className="py-3 px-6 text-center">{data.clockOut}</td>
              <td className="py-3 px-6 text-center">{data.status}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-[#2C74D8] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleViewClick(data)}
                >
                  View
                </button>
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
      <AttendanceDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attendance={selectedAttendance}
      />
    </div>
  );
};

export default AttendanceHistoryTable;
