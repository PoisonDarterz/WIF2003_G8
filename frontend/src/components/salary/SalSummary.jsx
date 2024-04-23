import React from 'react';

const summaryDetails = {
  basic: 2000,
  allowance: 500,
  "Bonus - Deductions": 300,
  "EPF \/ Socso": 200,
};


function SummaryBox({ employees }) {
  const checkedEmployees = employees.filter(employee => employee.checked);
  const totalEach = Object.values(summaryDetails).reduce((a, b) => a + b, 0);
  const totalBatch = totalEach * employees.filter(employee => employee.checked).length;

  return (
    <div className="h-[70vh] w-2/5 bg-[#EAF3FF] rounded-lg p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4">Summary:</h2>
        {Object.entries(summaryDetails).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center mb-2">
            <span className="capitalize">{key}</span>
            <span>RM {value}</span>
          </div>
        ))}
        <h2 className="text-lg font-bold mb-4">Employees:</h2>
        {checkedEmployees.map((employee) => (
          <div key={employee.id} className="m-2 text-left">
            <span>{employee.name}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span>Total each:</span>
          <span>RM {totalEach}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Total for batch:</span>
          <span>RM {totalBatch}</span>
        </div>
        <div className="flex justify-end mt-4">
          <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="mr-2 rounded px-4">Preview slip</button>
          <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4">Generate</button>
        </div>
      </div>
    </div>
  );
}

export default SummaryBox;