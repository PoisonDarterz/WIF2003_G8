import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LeaveHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [leaveData, setLeaveData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [updatedLeaveData, setUpdatedLeaveData] = useState([]);

  useEffect(() => {
    const preloadData = [
      {
        monthIssued: "October 2023",
        startDate: "31/10/2023",
        endDate: "1/11/2023",
        leaveType: "Sick",
        status: "Accepted",
      },
      {
        monthIssued: "October 2023",
        startDate: "28/10/2023",
        endDate: "30/10/2023",
        leaveType: "Vacation",
        status: "Pending",
      },
      {
        monthIssued: "October 2023",
        startDate: "20/10/2023",
        endDate: "25/10/2023",
        leaveType: "Personal Leave",
        status: "Rejected",
      },
      {
        monthIssued: "October 2023",
        startDate: "19/10/2023",
        endDate: "18/10/2023",
        leaveType: "Others (Medical Appointment)",
        status: "Accepted",
      },
      {
        monthIssued: "September 2023",
        startDate: "19/9/2023",
        endDate: "11/9/2023",
        leaveType: "Sick",
        status: "Accepted",
      },
      {
        monthIssued: "September 2023",
        startDate: "5/9/2023",
        endDate: "10/9/2023",
        leaveType: "Vacation",
        status: "Accepted",
      },
    ];

    const handleStorageUpdate = () => {
      const loadedRecords =
        JSON.parse(localStorage.getItem("leaveRecords")) || [];
      setLeaveData(loadedRecords);
      setFilteredData(loadedRecords);
      setUpdatedLeaveData([]);
    };

    const existingRecords =
      JSON.parse(localStorage.getItem("leaveRecords")) || [];
    if (existingRecords.length === 0) {
      localStorage.setItem("leaveRecords", JSON.stringify(preloadData));
    }

    handleStorageUpdate();

    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedYear = selectedDate.getFullYear();
      const filtered = [...leaveData, ...updatedLeaveData]
        .filter(
          (data) =>
            new Date(data.startDate.split("/").reverse().join("-")).getMonth() +
              1 ===
              selectedMonth &&
            new Date(
              data.startDate.split("/").reverse().join("-")
            ).getFullYear() === selectedYear
        )
        .sort((a, b) => {
          const dateA = new Date(a.startDate.split("/").reverse().join("-"));
          const dateB = new Date(b.startDate.split("/").reverse().join("-"));
          return dateB - dateA;
        });
      setFilteredData(filtered);
    } else {
      const sorted = [...leaveData, ...updatedLeaveData].sort((a, b) => {
        const dateA = new Date(a.startDate.split("/").reverse().join("-"));
        const dateB = new Date(b.startDate.split("/").reverse().join("-"));
        return dateB - dateA;
      });
      setFilteredData(sorted);
    }
  }, [leaveData, updatedLeaveData, selectedDate]);

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
              <td className="py-3 px-6 text-center">{data.startDate}</td>
              <td className="py-3 px-6 text-center">{data.endDate}</td>
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
      <div className="mt-4 flex justify-between items-center">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-2 py-1 border border-gray-300 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistoryTable;
