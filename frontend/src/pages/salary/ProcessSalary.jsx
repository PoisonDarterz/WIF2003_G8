import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import EmpNameBox from "../../components/salary/EmpNameBox";
import SalaryBox from "../../components/salary/SalaryBox";
import SummaryBox from "../../components/salary/SalSummary";
import axios from 'axios';
import { generatePreview } from '../../components/salary/generatePreview';


function ProcessSalary() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', checked: false },
    { id: 2, name: 'Jane Doe', checked: false },
    // add more employees as needed
  ]);
  
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [salaryDetails, setSalaryDetails] = useState({
    basic: [],
    allowances: [],
    deductions: [],
  });

  const handlePreview = async () => {
    const firstSelectedEmployee = employees.find(employee => employee.checked);
    if (!firstSelectedEmployee) {
      alert('No employee selected');
      return;
    }
  
    const pdfUrl = await generatePreview(firstSelectedEmployee, salaryDetails);
    setPdfUrl(pdfUrl);
    setPreviewGenerated(true);
  
    // Create a new 'a' element, set its 'href' to the PDF URL, and click it to start the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'salary-slip.pdf';  // set the file name here
    link.click();
  };

  const handleGenerate = async () => {
    if (!previewGenerated) {
      alert('Please preview the salary slip first');
      return;
    }

    try {
      const response = await axios.post('/generate-pdf', { pdfUrl });
      setPdfUrl(response.data.pdfUrl);
      alert('PDF generated and uploaded successfully');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
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
        <SalaryBox setSalaryDetails={setSalaryDetails} />
        <SummaryBox employees={employees} handlePreview={handlePreview} handleGenerate={handleGenerate} salaryDetails={salaryDetails}/>
      </div>
    </div>
  )
}

export default ProcessSalary;