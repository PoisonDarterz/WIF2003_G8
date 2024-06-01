import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LeaveHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [leaveData, setLeaveData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/leave/applications",
          { withCredentials: true }
        );
        console.log(response.data);
        setLeaveData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedYear = selectedDate.getFullYear();
      const filtered = leaveData
        .filter(
          (data) =>
            new Date(data.startDate).getMonth() + 1 === selectedMonth &&
            new Date(data.startDate).getFullYear() === selectedYear
        )
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setFilteredData(filtered);
    } else {
      const sorted = leaveData.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setFilteredData(sorted);
    }
  }, [leaveData, selectedDate]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Attendance &nbsp;&nbsp;&#62;&nbsp;&nbsp; Leave History
        </h2>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/yyyy"
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
            <th className="py-3 px-6 text-center">Start Date</th>
            <th className="py-3 px-6 text-center">End Date</th>
            <th className="py-3 px-6 text-center">Type of Leave</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">View Application</th>
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
              <td className="py-3 px-6 text-center">{data.monthIssued}</td>
              <td className="py-3 px-6 text-center">
                {formatDate(data.startDate)}
              </td>
              <td className="py-3 px-6 text-center">
                {formatDate(data.endDate)}
              </td>
              <td className="py-3 px-6 text-center">{data.leaveType}</td>
              <td className="py-3 px-6 text-center">{data.status}</td>
              <td className="py-3 px-6 text-center">
                {data.file && (
                  <a
                    href={data.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2C74D8] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    View
                  </a>
                )}
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

export default LeaveHistoryTable;
