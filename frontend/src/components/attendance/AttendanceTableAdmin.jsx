import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceTableAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const adminAttendanceData = [
      {
        employeeId: "EMP001",
        employeeName: "John Doe",
        month: 4,
        year: 2024,
        date: 15,
        status: "Present",
      },
      {
        employeeId: "EMP002",
        employeeName: "Jane Smith",
        month: 4,
        year: 2024,
        date: 16,
        status: "Absent",
      },
      {
        employeeId: "EMP003",
        employeeName: "Emily Johnson",
        month: 4,
        year: 2024,
        date: 17,
        status: "Late",
      },
      {
        employeeId: "EMP004",
        employeeName: "Michael Brown",
        month: 4,
        year: 2024,
        date: 18,
        status: "Present",
      },
      {
        employeeId: "EMP005",
        employeeName: "Jessica Davis",
        month: 4,
        year: 2024,
        date: 19,
        status: "Present",
      },
      {
        employeeId: "EMP006",
        employeeName: "William Garcia",
        month: 4,
        year: 2024,
        date: 20,
        status: "Absent",
      },
      {
        employeeId: "EMP007",
        employeeName: "Olivia Miller",
        month: 4,
        year: 2024,
        date: 21,
        status: "Present",
      },
      {
        employeeId: "EMP008",
        employeeName: "James Wilson",
        month: 4,
        year: 2024,
        date: 22,
        status: "Present",
      },
      {
        employeeId: "EMP009",
        employeeName: "Sophia Martinez",
        month: 4,
        year: 2024,
        date: 23,
        status: "Late",
      },
      {
        employeeId: "EMP010",
        employeeName: "Benjamin Anderson",
        month: 4,
        year: 2024,
        date: 24,
        status: "Present",
      },
      {
        employeeId: "EMP011",
        employeeName: "Isabella Thomas",
        month: 4,
        year: 2024,
        date: 25,
        status: "Present",
      },
      {
        employeeId: "EMP012",
        employeeName: "Ethan Taylor",
        month: 4,
        year: 2024,
        date: 26,
        status: "Absent",
      },
      {
        employeeId: "EMP013",
        employeeName: "Ava Moore",
        month: 4,
        year: 2024,
        date: 27,
        status: "Present",
      },
      {
        employeeId: "EMP014",
        employeeName: "Matthew Jackson",
        month: 4,
        year: 2024,
        date: 28,
        status: "Present",
      },
      {
        employeeId: "EMP015",
        employeeName: "Abigail Harris",
        month: 4,
        year: 2024,
        date: 29,
        status: "Late",
      },
      {
        employeeId: "EMP016",
        employeeName: "Lucas Clark",
        month: 4,
        year: 2024,
        date: 30,
        status: "Present",
      },
      {
        employeeId: "EMP017",
        employeeName: "Mia Rodriguez",
        month: 5,
        year: 2024,
        date: 1,
        status: "Present",
      },
      {
        employeeId: "EMP018",
        employeeName: "Alexander Lewis",
        month: 5,
        year: 2024,
        date: 2,
        status: "Absent",
      },
      {
        employeeId: "EMP019",
        employeeName: "Charlotte Walker",
        month: 5,
        year: 2024,
        date: 3,
        status: "Present",
      },
      {
        employeeId: "EMP020",
        employeeName: "Aiden Hall",
        month: 5,
        year: 2024,
        date: 4,
        status: "Late",
      },
    ];

    const handleStorageUpdate = () => {
      let loadedRecords =
        JSON.parse(localStorage.getItem("adminAttendanceRecords")) || [];
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
      JSON.parse(localStorage.getItem("adminAttendanceRecords")) || [];
    if (existingRecords.length === 0) {
      localStorage.setItem(
        "adminAttendanceRecords",
        JSON.stringify(adminAttendanceData)
      );
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Attendance &nbsp;&nbsp;&#62;&nbsp;&nbsp; Admin Attendance History
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
            <th className="py-3 px-6 text-center">Employee ID</th>
            <th className="py-3 px-6 text-center">Employee Name</th>
            <th className="py-3 px-6 text-center">Month Issued</th>
            <th className="py-3 px-6 text-center">Date Issued</th>
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
              <td className="py-3 px-6 text-center">{data.employeeId}</td>
              <td className="py-3 px-6 text-center">{data.employeeName}</td>
              <td className="py-3 px-6 text-center">
                {new Date(data.year, data.month - 1).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="py-3 px-6 text-center">
                {formatDate(new Date(data.year, data.month - 1, data.date))}
              </td>
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

export default AttendanceTableAdmin;
