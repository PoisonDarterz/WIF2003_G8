import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link } from "react-router-dom";

const employeeData = [
  { id: '#E00318', name: 'John Smith', department: 'Sales', email: 'john.smith@gmail.com'},
  { id: '#E00278', name: 'Emily Johnson', department: 'Marketing', email: 'emily.johnson@gmail.com'},
  { id: '#E00106', name: 'David Lee', department: 'Engineering', email: 'david.lee@gmail.com'},
  { id: '#E00335', name: 'Sarah Brown', department: 'Human Resources', email: 'sarah.brown@gmail.com'},
  { id: '#E00243', name: 'Michael Garcia', department: 'Finance', email: 'michael.garcia@gmail.com'},
  { id: '#E00189', name: 'Jessica Martinez', department: 'Operations', email: 'jessica.martinez@gmail.com'},
];

function ViewEmployeeList() {
  return (
    <div className="p-8">
      <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
        <TopNavBlack />
      </div>
      <div className="mt-8 mb-4 text-left">
        <h1 className="text-2xl font-bold">Employee Information</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Filters:</h2>
        <div>          
          <label className="mr-2">Employee ID:</label>
          <input type="text" className="border p-1 rounded" />
          <label className="ml-20 mr-2">Department:</label>
          <input type="text" className="border p-1 rounded" />
          <label className="ml-20 mr-2">Job title:</label>
          <input type="text" className="border p-1 rounded" />
        </div>
      </div>
      <div className="overflow-x-auto mt-10 p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-medium text-center text-gray-700 rounded-lg">
              <th className="w-[19%] px-4 py-2 bg-gray-200">Employee ID</th>
              <th className="w-[24%] px-4 py-2 bg-gray-200">Name</th>
              <th className="w-[19%] px-4 py-2 bg-gray-200">Department</th>
              <th className="w-[24%] px-4 py-2 bg-gray-200">Email</th>
              <th className="w-[14%] px-4 py-2 bg-gray-200">View Profile</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {employeeData.map((data, i) => (
              <tr className={`${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`}>
                <td className="w-[19%] px-4 py-4">{data.id}</td>
                <td className="w-[24%] px-4 py-4">{data.name}</td>
                <td className="w-[19%] px-4 py-4">{data.department}</td>
                <td className="w-[24%] px-4 py-4">{data.email}</td>
                <td className="w-[14%] px-4 py-4">
                <Link to="/info/viewProfile">
                  <button className="px-2 py-1 text-sm text-[#2C74D8]">View</button>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-[#2C74D8] rounded">1</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">2</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
        </div>
      </div>
    </div>


  );
}

export default ViewEmployeeList;