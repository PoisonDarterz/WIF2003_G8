import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate } from 'react-router-dom';

function AllEmployeeTickets(){
  const navigate=useNavigate();
  
  const handleResolveTicket=()=>{
    navigate("/helpdesk/resolveTicket")
  }

  const allTickets=[
    {"ticketID":"T006","employeeID":"E1001","reportDate":"13 April 2024","reportTime":"2:45pm","category":"Financial Misconduct","subject":"Unauthorized Expenses Claims","assignedInvestigator":"-","status":"pending"},
    {"ticketID":"T005","employeeID":"E1002","reportDate":"28 Feb 2024","reportTime":"5:56pm","category":"Others","subject":"Safety Violations","assignedInvestigator":"Ahmad","status":"in progress"},
    {"ticketID":"T004","employeeID":"E1003","reportDate":"1 Jan 2024","reportTime":"11:23am","category":"Data Security Breaches","subject":"Unauthorized Access to Confidential Data","assignedInvestigator":"Firdaus","status":"in progress"},
    {"ticketID":"T003","employeeID":"E1004","reportDate":"27 Dec 2023","reportTime":"2:28pm","category":"Discrimination","subject":"Unfair Treatment due to National Origin","assignedInvestigator":"Desmond","status":"resolved"},
    {"ticketID":"T002","employeeID":"E1001","reportDate":"4 August 2023","reportTime":"4:45pm","category":"Workplace harassment","subject":"Inappropriate Behavior by Colleague","assignedInvestigator":"Kong","status":"resolved"},
    {"ticketID":"T001","employeeID":"E1001","reportDate":"26 Mac 2023","reportTime":"10:49am","category":"Financial Misconduct","subject":"Misuse of Company Funds","assignedInvestigator":"Sharran","status":"resolved"},
  ]
    return(
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <p className="text-lg">Investigate and resolve non-compliance</p>
        </div>
        <div className="mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-medium text-center text-gray-700 rounded-lg bg-gray-200">
              <th className="w-[7%] px-4 py-2">Ticket ID</th>
              <th className="w-[9%] px-4 py-2">Employee ID</th>
              <th className="w-[10%] px-4 py-2">Report Date</th>
              <th className="w-[10%] px-4 py-2">Report Time</th>
              <th className="w-[18%] px-4 py-2">Category</th>
              <th className="w-[18%] px-4 py-2">Subject</th>
              <th className="w-[18%] px-4 py-2">Assigned Investigator</th>
              <th className="w-[14%] px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {allTickets.map((data, i) => (
              <tr onClick={handleResolveTicket} className={`${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`}>
                <td className="w-[7%] px-4 py-4">{data.ticketID}</td>
                <td className="w-[9%] px-4 py-4">{data.employeeID}</td>
                <td className="w-[10%] px-4 py-4">{data.reportDate}</td>
                <td className="w-[10%] px-4 py-4">{data.reportTime}</td>
                <td className="w-[18%] px-4 py-4">{data.category}</td>
                <td className="w-[18%] px-4 py-4">{data.subject}</td>
                <td className="w-[%] px-4 py-4">{data.assignedInvestigator}</td>
                <td className="w-[14%] px-4 py-4">{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-[#2C74D8] rounded">1</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">2</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">3</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
        </div>
      </div>
      
    )
}

export default AllEmployeeTickets;