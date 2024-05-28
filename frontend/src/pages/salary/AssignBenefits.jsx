import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import EmpNameBox from "../../components/salary/EmpNameBox";
import BenefitsBox from "../../components/salary/BenefitsBox";
import axios from 'axios';

function AssignBenefits() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [roleBenefits, setRoleBenefits] = useState([{
    type: "",
    benefits: [{ name: "", notes: "" }],
  }]);
  const [individualBenefits, setIndividualBenefits] = useState([{
    name: "",
    notes: "",
  }]);

  const handleSave = async (localBenefits) => {
    const checkedEmployee = employees.find(employee => employee.checked);
    if (!checkedEmployee) {
      window.alert('No employee selected');
      return;
    }
    const employeeId = checkedEmployee.id;
    const roleBenefits = localBenefits.filter(benefit => benefit.type !== 'Individual');
    const individualBenefits = localBenefits.find(benefit => benefit.type === 'Individual').benefits;
    try {
      // Make a PUT request to your server with the updated benefits
      const response = await axios.put(`http://localhost:5000/api/benefits/update/${employeeId}`, {
        roleBenefits: roleBenefits.map(benefit => ({
          type: benefit.type,
          benefits: benefit.benefits.map(benefitDetail => ({
            benefit: benefitDetail.name,
            notes: benefitDetail.notes,
          })),
        })),
        individualBenefits: individualBenefits.map(benefit => ({
          name: benefit.name,
          notes: benefit.notes,
        })),
      });
  
      // Check if the request was successful
      if (response.status === 200) {
        setRoleBenefits(roleBenefits);
        setIndividualBenefits(individualBenefits);
        setUnsavedChanges(false);
      } else {
        console.error('Failed to save benefits:', response);
      }
    } catch (error) {
      console.error('Failed to save benefits:', error);
    }
  };

  const loadEmployeeBenefits = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/benefits/fetch/${employeeId}`);
      const { roleBenefits, individualBenefits } = response.data;
      setRoleBenefits(roleBenefits.map(benefit => ({
        type: benefit.type,
        benefits: benefit.benefits.map(benefit => ({
          name: benefit.name,
          notes: benefit.notes,
        })),
      })));
      setIndividualBenefits(individualBenefits.map(benefit => ({
        name: benefit.name,
        notes: benefit.notes,
      })));
    } catch (error) {
      console.error('Failed to load employee benefits:', error);
    }
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
          <input type="text" className="border p-1 rounded" value={searchId} onChange={e => setSearchId(e.target.value)} />
          <label className="ml-4 mr-2">Job title:</label>
          <input type="text" className="border p-1 rounded" value={searchJobTitle} onChange={e => setSearchJobTitle(e.target.value)} />
        </div>
      </div>
      <div className="flex space-x-8">
        <EmpNameBox
          employees={employees}
          setEmployees={setEmployees}
          searchId={searchId}
          searchJobTitle={searchJobTitle}
          singleSelect={true}
          width='w-1/4'
          unsavedChanges={unsavedChanges}
          loadEmployeeBenefits={loadEmployeeBenefits}
          AB
        />
        <BenefitsBox
          handleSave={handleSave}
          unsavedChanges={unsavedChanges}
          setUnsavedChanges={setUnsavedChanges}
          roleBenefits={roleBenefits}
          individualBenefits={individualBenefits}
        />
      </div>
    </div>
  )
}

export default AssignBenefits;