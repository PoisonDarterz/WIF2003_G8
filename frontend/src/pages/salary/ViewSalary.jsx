import React from "react";
import TopNavBlack from "../../components/TopNavBlack";

const slipData = [
  { id: '#S0032211', month: 'Nov 2022', date: '6/12/2022' },
  { id: '#S0032212', month: 'Dec 2022', date: '7/1/2023' },
  { id: '#S0032301', month: 'Jan 2023', date: '5/2/2023' },
  { id: '#S0032302', month: 'Feb 2023', date: '6/3/2023' },
  { id: '#S0032303', month: 'Mar 2023', date: '7/4/2023' },
  { id: '#S0032304', month: 'Apr 2023', date: '6/5/2023' }
];

function ViewSalary() {
  return (
    <div className="p-8">
      <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
        <TopNavBlack />
      </div>
      <div className="mt-8 mb-4 text-left">
        <h1 className="text-2xl font-bold">Past salary slips</h1>
        <p className="text-lg">View all your past salary slips here.</p>
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
            {slipData.map((data, i) => (
              <tr className={`${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`}>
                <td className="w-[18%] px-4 py-4">{data.id}</td>
                <td className="w-[18%] px-4 py-4">{data.month}</td>
                <td className="w-[18%] px-4 py-4">{data.date}</td>
                <td className="min-w-[46%] px-4 py-4 flex justify-center space-x-16">
                  <button className="px-2 py-1 text-sm text-[#2C74D8]">Preview</button>
                  <button className="px-2 py-1 text-sm text-[#2C74D8]">Print</button>
                  <button className="px-2 py-1 text-sm text-[#2C74D8]">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-[#2C74D8] rounded">1</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">2</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">3</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
        </div>
      </div>
    </div>


  );
}

export default ViewSalary;
