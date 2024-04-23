import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import EmpNameBox from "../../components/salary/EmpNameBox";
import SalaryBox from "../../components/salary/SalaryBox";
import SummaryBox from "../../components/salary/SalSummary";
import SalaryDialog from "../../components/salary/SalaryDialog";


function ProcessSalary() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', checked: false },
    { id: 2, name: 'Jane Doe', checked: false },
    // add more employees as needed
  ]);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  return (
    <div className="p-8">
      <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
        <TopNavBlack />
      </div>
      <div className="mt-8 mb-4 text-left">
        <h1 className="text-2xl font-bold">Process salary</h1>
        <p className="text-lg">Generate salary slips for employees, individually or by batch.</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">Filters: Employee ID:</label>
          <input type="text" className="border p-1 rounded" />
          <label className="ml-4 mr-2">Job title:</label>
          <input type="text" className="border p-1 rounded" />
        </div>
      </div>
      <div className="flex space-x-6">
        <EmpNameBox employees={employees} setEmployees={setEmployees} singleSelect={false} width='w-1/5' />
        <SalaryBox openModal={openModal}/>
        <SummaryBox employees={employees} />
      </div>
      <SalaryDialog isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  )
}

export default ProcessSalary;