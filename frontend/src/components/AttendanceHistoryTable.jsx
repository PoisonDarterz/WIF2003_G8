import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const preloadData = [
      {
        month: 4,
        date: 4,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Present",
      },
      {
        month: 4,
        date: 3,
        year: 2023,
        clockIn: "08:10:00 AM",
        clockOut: "05:00:00 PM",
        status: "Late",
      },
      {
        month: 4,
        date: 2,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "08:00:00 PM",
        status: "Present",
      },
      {
        month: 4,
        date: 1,
        year: 2023,
        clockIn: "09:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Late",
      },
      {
        month: 3,
        date: 31,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Present",
      },
      {
        month: 3,
        date: 30,
        year: 2023,
        clockIn: "-",
        clockOut: "-",
        status: "Absent",
      },
      {
        month: 4,
        date: 1,
        year: 2023,
        clockIn: "09:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Late",
      },
      {
        month: 3,
        date: 31,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Present",
      },
      {
        month: 3,
        date: 30,
        year: 2023,
        clockIn: "-",
        clockOut: "-",
        status: "Absent",
      },
      {
        month: 3,
        date: 29,
        year: 2023,
        clockIn: "08:05:00 AM",
        clockOut: "05:10:00 PM",
        status: "Present",
      },
      {
        month: 3,
        date: 28,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Present",
      },
      {
        month: 3,
        date: 27,
        year: 2023,
        clockIn: "08:20:00 AM",
        clockOut: "05:00:00 PM",
        status: "Late",
      },
      {
        month: 3,
        date: 26,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Present",
      },
      {
        month: 3,
        date: 25,
        year: 2023,
        clockIn: "08:00:00 AM",
        clockOut: "05:00:00 PM",
        status: "Present",
      },
    ];

    const handleStorageUpdate = () => {
      let loadedRecords =
        JSON.parse(localStorage.getItem("attendanceRecords")) || [];
      loadedRecords.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        if (b.month !== a.month) {
          return b.month - a.month;
        }
        return b.date - a.date;
      });
      setAttendanceData(loadedRecords);
    };
    const existingRecords =
      JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    if (existingRecords.length === 0) {
      localStorage.setItem("attendanceRecords", JSON.stringify(preloadData));
    }

    handleStorageUpdate();

    window.addEventListener("storageUpdated", handleStorageUpdate);
    return () => {
      window.removeEventListener("storageUpdated", handleStorageUpdate);
    };
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

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
                <button className="bg-[#2C74D8] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  View
                </button>
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

export default AttendanceHistoryTable;
