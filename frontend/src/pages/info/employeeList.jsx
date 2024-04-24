import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link } from "react-router-dom";

const employeeData = [
  { id: '#E00318', name: 'John Smith', department: 'Sales', jobTitle: 'Sales Manager', email: 'john.smith@gmail.com'},
  { id: '#E00278', name: 'Emily Johnson', department: 'Marketing', jobTitle: 'Marketing Specialist', email: 'emily.johnson@gmail.com'},
  { id: '#E00106', name: 'David Lee', department: 'Engineering', jobTitle: 'Software Engineer', email: 'david.lee@gmail.com'},
  { id: '#E00335', name: 'Sarah Brown', department: 'Human Resources', jobTitle: 'HR Coordinator', email: 'sarah.brown@gmail.com'},
  { id: '#E00243', name: 'Michael Garcia', department: 'Finance', jobTitle: 'Financial Analyst', email: 'michael.garcia@gmail.com'},
  { id: '#E00189', name: 'Jessica Martinez', department: 'Operations', jobTitle: 'Operations Manager', email: 'jessica.martinez@gmail.com'},
  { id: '#E00456', name: 'Daniel Clark', department: 'Customer Service', jobTitle: 'Customer Service Representative', email: 'daniel.clark@gmail.com'},
  { id: '#E00567', name: 'Sophia Anderson', department: 'Information Technology', jobTitle: 'IT Specialist', email: 'sophia.anderson@gmail.com'},
  { id: '#E00678', name: 'Matthew Taylor', department: 'Research and Development', jobTitle: 'Research Scientist', email: 'matthew.taylor@gmail.com'},
  { id: '#E00789', name: 'Olivia White', department: 'Quality Assurance', jobTitle: 'QA Engineer', email: 'olivia.white@gmail.com'},
  { id: '#E00890', name: 'Emma Thompson', department: 'Public Relations', jobTitle: 'PR Manager', email: 'emma.thompson@gmail.com'},
  { id: '#E00987', name: 'Andrew Wilson', department: 'Product Management', jobTitle: 'Product Manager', email: 'andrew.wilson@gmail.com'},
  { id: '#E01054', name: 'Grace Davis', department: 'Customer Success', jobTitle: 'Customer Success Manager', email: 'grace.davis@gmail.com'},
  { id: '#E01123', name: 'William Baker', department: 'Legal', jobTitle: 'Legal Counsel', email: 'william.baker@gmail.com'},
  { id: '#E01234', name: 'Natalie Moore', department: 'Human Resources', jobTitle: 'Recruitment Specialist', email: 'natalie.moore@gmail.com'},
];

function ViewEmployeeList() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filters, setFilters] = useState({ id: "", department: "", jobTitle: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 

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
    employee.department.toLowerCase().includes(filters.department.toLowerCase()) &&
    employee.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())
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
      <div className="mb-4" style={{ textAlign: 'left' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchInputChange} 
          className="border p-1 rounded mr-2"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Filters:</h2>
        <div>          
          <label className="mr-2">Employee ID:</label>
          <input type="text" name="id" value={filters.id} onChange={handleFilterChange} className="border p-1 rounded" />
          <label className="ml-20 mr-2">Department:</label>
          <input type="text" name="department" value={filters.department} onChange={handleFilterChange} className="border p-1 rounded" />
          <label className="ml-20 mr-2">Job title:</label>
          <input type="text" name="jobTitle" value={filters.jobTitle} onChange={handleFilterChange} className="border p-1 rounded" /> 
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
                <td className="w-[15%] px-4 py-4">{data.department}</td>
                <td className="w-[20%] px-4 py-4">{data.jobTitle}</td>
                <td className="w-[20%] px-4 py-4">{data.email}</td>
                <td className="w-[10%] px-4 py-4">
                  <Link to="/info/viewProfile">
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
