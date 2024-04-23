import React, { useState } from 'react';

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  // add more employees as needed
];

function EmpNameBox({ employees: initialEmployees = [], setEmployees: setEmployeesProp, singleSelect = false, width='w-1/4' }) {
  const [localEmployees, setLocalEmployees] = useState(initialEmployees);
  
  const employees = setEmployeesProp ? initialEmployees : localEmployees;
  const setEmployees = setEmployeesProp || setLocalEmployees;

  const handleCheckboxChange = (event, id) => {
    if (singleSelect) {
      setEmployees(
        employees.map(employee =>
          employee.id === id ? { ...employee, checked: event.target.checked } : { ...employee, checked: false }
        )
      );
    } else {
      setEmployees(
        employees.map(employee =>
          employee.id === id ? { ...employee, checked: event.target.checked } : employee
        )
      );
    }
  };

  return (
    <div className={`h-[70vh] ${width} bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto`}>
      {employees.map((employee) => (
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