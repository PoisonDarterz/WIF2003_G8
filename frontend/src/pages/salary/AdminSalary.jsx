import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import PreviewPopup from '../../components/salary/PreviewPopup';

function AdminSalary() {
  const [slipData, setSlipData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchSlipId, setSearchSlipId] = useState('');
  const [searchDateFrom, setSearchDateFrom] = useState('');
  const [searchDateTo, setSearchDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [previewData, setPreviewData] = useState(null);

  const handlePreview = (id) => {
    const data = originalData.find(slip => `#${slip.slipId}` === id);
    setPreviewData(data);
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  const convertDate = (inputFormat) => {
    let splitDate = inputFormat.split("/");
    return splitDate[1] + '/' + splitDate[0] + '/' + splitDate[2];
  } 

  const filteredData = slipData.filter(slip => {
    return (
      (searchSlipId === '' || slip.id.includes(searchSlipId)) &&
      (searchDateFrom === '' || new Date(convertDate(slip.date)) >= new Date(searchDateFrom)) &&
      (searchDateTo === '' || new Date(convertDate(slip.date)) <= new Date(searchDateTo))
    );
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/salary/getAll')
      .then(response => response.json())
      .then(data => {
        setOriginalData(data); // Store the original data
        const formattedData = data.map(slip => {
          const date = new Date(slip.dateIssued);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          const formattedMonth = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
          return {
            id: `#${slip.slipId}`,
            month: formattedMonth,
            date: formattedDate,
            documentURL: slip.documentURL
          };
        });
        setSlipData(formattedData);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="p-8">
      {previewData && <PreviewPopup data={previewData} onClose={handleClosePreview} />}
      <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
        <TopNavBlack />
      </div>
      <div className="mt-8 mb-4 text-left">
        <h1 className="text-2xl font-bold">Past salary slips</h1>
        <p className="text-lg">View all employee’s past salary slips here. Want to generate slips? <a href="/salary/process" className="text-blue-500 underline">Click here.</a></p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">Filters: Employee ID:</label>
          <input type="text" className="border p-1 rounded" value={searchSlipId} onChange={e => setSearchSlipId(e.target.value)} />
          <label className="ml-4 mr-2">Date issued: From:</label>
          <input type="date" className="border p-1 rounded" value={searchDateFrom} onChange={e => setSearchDateFrom(e.target.value)} />
          <label className="ml-4 mr-2">To:</label>
          <input type="date" className="border p-1 rounded" value={searchDateTo} onChange={e => setSearchDateTo(e.target.value)} />
        </div>
      </div>
      <div className="overflow-x-auto mt-10 p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-medium text-center text-gray-700 rounded-lg">
              <th className="w-[18%] px-4 py-2 bg-gray-200">Salary ID</th>
              <th className="w-[18%] px-4 py-2 bg-gray-200">Month</th>
              <th className="w-[18%] px-4 py-2 bg-gray-200">Date Issued</th>
              <th className="w-[46%] px-4 py-2 bg-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {currentRecords.map((data, i) => (
              <tr className={`${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`}>
                <td className="w-[18%] px-4 py-4">{data.id}</td>
                <td className="w-[18%] px-4 py-4">{data.month}</td>
                <td className="w-[18%] px-4 py-4">{data.date}</td>
                <td className="min-w-[46%] px-4 py-4 flex justify-center space-x-16">
                  <button className="px-2 py-1 text-sm text-[#2C74D8]" onClick={() => handlePreview(data.id)}>Preview</button>
                  <button className="px-2 py-1 text-sm text-[#2C74D8]" onClick={() => window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(data.documentURL)}`)}>Print</button>
                  <a href={data.documentURL} download className="px-2 py-1 text-sm text-[#2C74D8]">Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className={`px-4 py-2 ml-2 text-sm ${i + 1 === currentPage ? 'text-white bg-[#2C74D8]' : 'text-black bg-gray-300'} rounded`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          ))}
          <button className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>


  );
}

export default AdminSalary;