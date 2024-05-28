import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import EmpNameBox from "../../components/salary/EmpNameBox";
import BenefitsBox from "../../components/salary/BenefitsBox";

function AssignBenefits() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [roleBenefits, setRoleBenefits] = useState([{
    type:"",
    benefits: [{name:"", notes:""}],
  }]);
  const [individualBenefits, setIndividualBenefits] = useState([{
    benefits: "",
    notes: "",
  }]);

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
          <input type="text" className="border p-1 rounded" value={searchId} onChange={e => setSearchId(e.target.value)} />
          <label className="ml-4 mr-2">Job title:</label>
          <input type="text" className="border p-1 rounded" value={searchJobTitle} onChange={e => setSearchJobTitle(e.target.value)} />
        </div>
      </div>
      <div className="flex space-x-8">
        <EmpNameBox employees={employees} setEmployees={setEmployees} searchId={searchId} searchJobTitle={searchJobTitle} singleSelect={true} width='w-1/4' />
        <BenefitsBox setRoleBenefits={setRoleBenefits} setIndividualBenefits={setIndividualBenefits} />
      </div>
    </div>
  )
}

export default AssignBenefits;