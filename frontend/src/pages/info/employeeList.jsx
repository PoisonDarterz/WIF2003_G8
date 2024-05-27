import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewEmployeeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ id: "", department: "", jobTitle: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeData, setEmployeeData] = useState([]);
  const recordsPerPage = 6;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        console.log("Fetched employees from frontend:", response.data);
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredEmployeeData = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    employee.id.toLowerCase().includes(filters.id.toLowerCase()) &&
    employee.roleId.departmentId.departmentName.toLowerCase().includes(filters.department.toLowerCase()) &&
    employee.roleId.roleName.toLowerCase().includes(filters.jobTitle.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEmployeeData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredEmployeeData.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8">
      <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
        <TopNavBlack />
      </div>
      <div className="mt-8 mb-4 text-left">
        <h1 className="text-2xl font-bold">Employee Information</h1>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold mr-1">Filters:</h2>
        <div>

          <label className="mr-2">ID:</label>
          <input type="text" name="id" value={filters.id} onChange={handleFilterChange} className="border p-1 rounded mr-2" />
          <label className="mr-2">Name:</label>
          <input type="text" name="name" value={searchQuery} onChange={handleSearchInputChange} className="border p-1 rounded mr-2" />
          <label className="mr-2">Department:</label>
          <input type="text" name="department" value={filters.department} onChange={handleFilterChange} className="border p-1 rounded mr-2" />
          <label className="mr-2">Job title:</label>
          <input type="text" name="jobTitle" value={filters.jobTitle} onChange={handleFilterChange} className="border p-1 rounded mr-2" />
        </div>
      </div>
      <div className="overflow-x-auto mt-10 p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-medium text-center text-gray-700 rounded-lg">
              <th className="w-[15%] px-4 py-2 bg-gray-200">Employee ID</th>
              <th className="w-[20%] px-4 py-2 bg-gray-200">Name</th>
              <th className="w-[15%] px-4 py-2 bg-gray-200">Department</th>
              <th className="w-[20%] px-4 py-2 bg-gray-200">Job Title</th>
              <th className="w-[20%] px-4 py-2 bg-gray-200">Email</th>
              <th className="w-[10%] px-4 py-2 bg-gray-200">View Profile</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {currentRecords.map((data, i) => (
              <tr className={`${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`} key={data.id}>
                <td className="w-[15%] px-4 py-4">{data.id}</td>
                <td className="w-[20%] px-4 py-4">{data.name}</td>
                <td className="w-[15%] px-4 py-4">{data.roleId.departmentId.departmentName}</td>
                <td className="w-[20%] px-4 py-4">{data.roleId.roleName}</td>
                <td className="w-[20%] px-4 py-4">{data.email.email}</td>
                <td className="w-[10%] px-4 py-4">
                  <Link to={`/info/viewProfile/${data.id}`}>
                    <button className="px-2 py-1 text-sm text-[#2C74D8]">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-6">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 ml-2 text-sm rounded ${currentPage === i + 1 ? 'bg-[#2C74D8] text-white' : 'text-black bg-gray-300'}`}>{i + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeList;
