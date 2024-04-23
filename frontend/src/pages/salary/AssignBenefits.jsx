import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import EmpNameBox from "../../components/salary/EmpNameBox";
import BenefitsBox from "../../components/salary/BenefitsBox";
import BenefitsDialog from "../../components/salary/BenefitsDialog";

function AssignBenefits() {
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
        <h1 className="text-2xl font-bold">Review and assign benefits</h1>
        <p className="text-lg">Review and assign benefits to employees under your management.</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">Filters: Employee ID:</label>
          <input type="text" className="border p-1 rounded" />
          <label className="ml-4 mr-2">Job title:</label>
          <input type="text" className="border p-1 rounded" />
        </div>
      </div>
      <div className="flex space-x-8">
        <EmpNameBox employees={employees} setEmployees={setEmployees} singleSelect={true} width='w-1/4' />
        <BenefitsBox openModal={openModal}/>
      </div>
      <BenefitsDialog isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  )
}

export default AssignBenefits;