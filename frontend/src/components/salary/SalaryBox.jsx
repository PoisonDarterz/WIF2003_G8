import React from 'react';

const salaryDetails = {
  allowances: [{ name: 'Allowance 1', amount: 300 }, { name: 'Allowance 2', amount: 200 }],
  bonuses: [{ name: 'Bonus 1', amount: 300 }, { name: 'Bonus 2', amount: 50 }],
  deductions: [{ name: 'Deduction 1', amount: 50 }],
  "EPF \/ Socso": [{ name: 'EPF', amount: 150 }, { name: 'SOCSO', amount: 50 }],
};

function SalaryBox() {
  return (
    <div className="h-[70vh] w-2/5 bg-[#EAF3FF] rounded-lg p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <span>Basic salary: RM</span>
        <input type="number" className="border p-1 rounded" />
      </div>
      {Object.entries(salaryDetails).map(([key, value]) => (
        <div key={key}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold capitalize">{key}</h3>
            <button style={{ backgroundColor: '#2C74D8', color: '#FFFFFF' }} className="rounded px-4">+ Add a record</button>
          </div>
          {value.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <span>{item.name}</span>
              <div className="flex justify-end items-center">
                <span className="font-semibold mr-4">RM {item.amount}</span>
                <div className="ml-4">
                  <button style={{ backgroundColor: '#EBB99E', color: '#000000' }} className="mr-2 rounded px-4">Edit</button>
                  <button style={{ backgroundColor: '#EB4335', color: '#FFFFFF' }} className="rounded px-4">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SalaryBox;