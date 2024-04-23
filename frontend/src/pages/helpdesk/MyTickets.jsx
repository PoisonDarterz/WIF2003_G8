import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate } from 'react-router-dom';

function MyTickets(){
  const navigate=useNavigate();
  
  const handleViewTicket=()=>{
    navigate("/helpdesk/reviewTicket")
  }

  const handleAddTicket=()=>{
    navigate("/helpdesk/addNewTicket")
  }

  const tickets=[
    {"ticketID":"T006","reportDate":"13 April 2024","reportTime":"2:45pm","category":"Financial Misconduct","subject":"Unauthorized Expenses Claims","assignedInvestigator":"-","status":"pending"},
    {"ticketID":"T002","reportDate":"4 August 2023","reportTime":"4:45pm","category":"Workplace harassment","subject":"Inappropriate Behavior by Colleague","assignedInvestigator":"Kong","status":"resolved"},
    {"ticketID":"T001","reportDate":"26 Mac 2023","reportTime":"10:49am","category":"Financial Misconduct","subject":"Misuse of Company Funds","assignedInvestigator":"Sharran","status":"resolved"},
  ]
    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">My tickets</h1>
          <p className="text-lg">Report any non-compliance here</p>
        </div>
        <div className="flex justify-end">
          <button onClick={handleAddTicket} className="flex w-52 h-7 p-2 bg-[#2C74D8] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 m-1 justify-center items-center">
            <div>
              <img className="w-5 h-5 mr-1" src={"/PlusIcon.png"} alt="report non-compliance"/>
            </div>
            <p>Report non-compliance</p>
          </button>
        </div>
        <div className="mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-medium text-center text-gray-700 rounded-lg bg-gray-200">
              <th className="w-[7%] px-4 py-2">Ticket ID</th>
              <th className="w-[10%] px-4 py-2">Report Date</th>
              <th className="w-[10%] px-4 py-2">Report Time</th>
              <th className="w-[20%] px-4 py-2">Category</th>
              <th className="w-[20%] px-4 py-2">Subject</th>
              <th className="w-[20%] px-4 py-2">Assigned Investigator</th>
              <th className="w-[7%] px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {tickets.map((data, i) => (
              <tr onClick={handleViewTicket} className={`${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`}>
                <td className="w-[5%] px-4 py-4">{data.ticketID}</td>
                <td className="w-[10%] px-4 py-4">{data.reportDate}</td>
                <td className="w-[10%] px-4 py-4">{data.reportTime}</td>
                <td className="w-[20%] px-4 py-4">{data.category}</td>
                <td className="w-[20%] px-4 py-4">{data.subject}</td>
                <td className="w-[20%] px-4 py-4">{data.assignedInvestigator}</td>
                <td className="w-[7%] px-4 py-4">{data.status}</td>
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

export default MyTickets;