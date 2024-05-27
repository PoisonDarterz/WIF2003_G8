import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmpNameBox({employees, setEmployees, searchId, searchJobTitle, singleSelect = false, width='w-1/4' }) {
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees'); 
        setEmployees(response.data.map(employee => ({ id: employee.id, name: employee.name, roleId: employee.roleId  })));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  const filteredEmployees = employees.filter(employee => 
    (searchId ? employee.id.toLowerCase().includes(searchId.toLowerCase()) : true) && 
    (searchJobTitle ? (employee.roleId ? employee.roleId.roleName.toLowerCase().includes(searchJobTitle.toLowerCase()) : false) : true)
  );

  const handleCheckboxChange = (event, id) => {
    if (singleSelect) {
      setEmployees(
        filteredEmployees.map(employee =>
          employee.id === id ? { ...employee, checked: event.target.checked } : { ...employee, checked: false }
        )
      );
    } else {
      setEmployees(
        filteredEmployees.map(employee =>
          employee.id === id ? { ...employee, checked: event.target.checked } : employee
        )
      );
    }
  };

  return (
    <div className={`h-[70vh] ${width} bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto`}>
      {filteredEmployees.map((employee) => (
        <div key={employee.id} className="flex items-center m-2">
          <label htmlFor={`employee-${employee.id}`} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id={`employee-${employee.id}`}
              className="hidden"
              checked={employee.checked}
              onChange={event => handleCheckboxChange(event, employee.id)}
            />
            <span className={`w-4 h-4 inline-block mr-4 rounded border border-gray-500 ${employee.checked ? 'bg-blue-500' : ''}`}></span>
            {employee.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default EmpNameBox;