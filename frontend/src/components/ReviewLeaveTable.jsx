import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaTimesCircle, FaPauseCircle } from "react-icons/fa";

const ReviewLeaveTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [leaveData, setLeaveData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, setStartDate] = useState(null);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const dummyData = [
      {
        employeeId: "EMP001",
        employeeName: "John Doe",
        startDate: "01/05/2023",
        endDate: "15/05/2023",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP002",
        employeeName: "Jane Smith",
        startDate: "01/06/2023",
        endDate: "10/06/2023",
        typeOfLeave: "Vacation",
      },
      {
        employeeId: "EMP003",
        employeeName: "Michael Johnson",
        startDate: "15/07/2023",
        endDate: "22/07/2023",
        typeOfLeave: "Personal Leave",
      },
      {
        employeeId: "EMP004",
        employeeName: "Emily Williams",
        startDate: "01/08/2023",
        endDate: "07/08/2023",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP005",
        employeeName: "David Brown",
        startDate: "10/09/2023",
        endDate: "17/09/2023",
        typeOfLeave: "Vacation",
      },
      {
        employeeId: "EMP006",
        employeeName: "Sarah Davis",
        startDate: "01/10/2023",
        endDate: "15/10/2023",
        typeOfLeave: "Others",
      },
      {
        employeeId: "EMP007",
        employeeName: "Christopher Miller",
        startDate: "01/11/2023",
        endDate: "07/11/2023",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP008",
        employeeName: "Jessica Wilson",
        startDate: "15/12/2023",
        endDate: "22/12/2023",
        typeOfLeave: "Vacation",
      },
      {
        employeeId: "EMP009",
        employeeName: "Matthew Moore",
        startDate: "01/01/2024",
        endDate: "15/01/2024",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP010",
        employeeName: "Ashley Taylor",
        startDate: "01/02/2024",
        endDate: "10/02/2024",
        typeOfLeave: "Personal Leave",
      },
      {
        employeeId: "EMP011",
        employeeName: "Daniel Anderson",
        startDate: "15/03/2024",
        endDate: "22/03/2024",
        typeOfLeave: "Vacation",
      },
      {
        employeeId: "EMP012",
        employeeName: "Olivia Thomas",
        startDate: "01/04/2024",
        endDate: "07/04/2024",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP013",
        employeeName: "William Jackson",
        startDate: "10/05/2024",
        endDate: "17/05/2024",
        typeOfLeave: "Others",
      },
      {
        employeeId: "EMP014",
        employeeName: "Sophia White",
        startDate: "01/06/2024",
        endDate: "15/06/2024",
        typeOfLeave: "Vacation",
      },
      {
        employeeId: "EMP015",
        employeeName: "Joseph Harris",
        startDate: "01/07/2024",
        endDate: "07/07/2024",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP016",
        employeeName: "Isabella Martin",
        startDate: "15/08/2024",
        endDate: "22/08/2024",
        typeOfLeave: "Personal Leave",
      },
      {
        employeeId: "EMP017",
        employeeName: "William Thompson",
        startDate: "01/09/2024",
        endDate: "07/09/2024",
        typeOfLeave: "Vacation",
      },
      {
        employeeId: "EMP018",
        employeeName: "Mia Garcia",
        startDate: "10/10/2024",
        endDate: "17/10/2024",
        typeOfLeave: "Sick",
      },
      {
        employeeId: "EMP019",
        employeeName: "Alexander Martinez",
        startDate: "01/11/2024",
        endDate: "15/11/2024",
        typeOfLeave: "Others",
      },
      {
        employeeId: "EMP020",
        employeeName: "Abigail Robinson",
        startDate: "01/12/2024",
        endDate: "10/12/2024",
        typeOfLeave: "Vacation",
      },
    ];

    const filteredData = dummyData.filter((item) => {
      const itemStartDate = parseDate(item.startDate);
      const selectedMonth = startDate ? startDate.getMonth() : null;
      const selectedYear = startDate ? startDate.getFullYear() : null;
      return startDate
        ? itemStartDate.getMonth() === selectedMonth &&
            itemStartDate.getFullYear() === selectedYear
        : true;
    });

    setLeaveData(filteredData);
    setTotalPages(Math.ceil(filteredData.length / entriesPerPage));
  }, [startDate, entriesPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAccept = (id) => {
    console.log("Leave Application Accepted", id);
  };

  const handleReject = (id) => {
    console.log("Leave Application Rejected", id);
  };

  const handlePending = (id) => {
    console.log("Leave Application still on Pending", id);
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
                {application.employeeId}
              </td>
              <td className="py-3 px-6 text-center">
                {application.employeeName}
              </td>
              <td className="py-3 px-6 text-center">{application.startDate}</td>
              <td className="py-3 px-6 text-center">{application.endDate}</td>
              <td className="py-3 px-6 text-center">
                {application.typeOfLeave}
              </td>
              <td className="py-3 px-6 text-center">
                <button className="bg-[#2C74D8] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  View
                </button>
              </td>
              <td className="py-3 px-6 text-center flex justify-center items-center space-x-2">
                <FaCheckCircle
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => handleAccept(application.id)}
                />
                <FaTimesCircle
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleReject(application.id)}
                />
                <FaPauseCircle
                  style={{ color: "yellow", cursor: "pointer" }}
                  onClick={() => handlePending(application.id)}
                />
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

export default ReviewLeaveTable;
