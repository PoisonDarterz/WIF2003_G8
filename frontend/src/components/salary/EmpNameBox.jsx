import React, { useState } from 'react';

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  // add more employees as needed
];

function EmpNameBox({ singleSelect = false }) {
  const [checkedState, setCheckedState] = useState(
    employees.map(employee => ({ id: employee.id, checked: false }))
  );

  const handleCheckboxChange = (event, id) => {
    if (singleSelect) {
      setCheckedState(
        checkedState.map(item =>
          item.id === id ? { ...item, checked: event.target.checked } : { ...item, checked: false }
        )
      );
    } else {
      setCheckedState(
        checkedState.map(item =>
          item.id === id ? { ...item, checked: event.target.checked } : item
        )
      );
    }
  };

  return (
    <div className="h-[70vh] w-1/4 bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto">
      {employees.map((employee) => (
        <div key={employee.id} className="flex items-center m-2">
          <label htmlFor={`employee-${employee.id}`} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id={`employee-${employee.id}`}
              className="hidden"
              checked={checkedState.find(item => item.id === employee.id).checked}
              onChange={event => handleCheckboxChange(event, employee.id)}
            />
            <span className={`w-4 h-4 inline-block mr-4 rounded border border-gray-500 ${checkedState.find(item => item.id === employee.id).checked ? 'bg-blue-500' : ''}`}></span>
            {employee.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default EmpNameBox;