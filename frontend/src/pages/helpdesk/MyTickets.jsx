import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from "axios";

function MyTickets(){
  const [tickets,setTickets]=useState([])
  const [investigators,setInvestigators]=useState([])

  const navigate=useNavigate();

  const handleViewTicket=(ticket,investigator)=>{
    ticket.investigator=investigator
    navigate("/helpdesk/reviewTicket",{state:ticket})
  }

  const handleAddTicket=()=>{
    navigate("/helpdesk/addNewTicket")
  }

  useEffect(()=>{
    const fetchTickets=async()=>{
      const response = await axios.get("http://localhost:5000/api/tickets/myTickets", {
        withCredentials: true,
      });
      console.log("MyTicket Response:",response.data);
      setTickets(response.data);

      const allInvestigatorIDs=response.data.map((ticket)=>(ticket.investigatorID))

      try{
        const response= await axios.post(`http://localhost:5000/api/employees/employee-Id&Name`,allInvestigatorIDs);
        console.log("Investigator with name:",response.data)
        setInvestigators(response.data)
      }catch(error){
        console.log("Error fetching investigator with name:",error)
      }
    }
    fetchTickets();
  },[])

    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">My tickets</h1>
          <p className="text-lg ">Report any non-compliance here</p>
        </div>
        <div className="flex justify-end">
          <button onClick={handleAddTicket} className="flex w-52 h-7 p-2 bg-[#2C74D8] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-transform m-1 justify-center items-center">
            <div>
              <img className="w-5 h-5 mr-1" src={"/PlusIcon.png"} alt="report non-compliance"/>
            </div>
            <p>Report non-compliance</p>
          </button>
        </div>
        <div className="mt-5">
        {tickets.length===0?<p className="text-2xl font-bold">No ticket</p>:
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
                  {tickets.map((ticket, i) => {
                    const isoString=ticket.dateTimeCreated;
                    const utcDate = new Date(isoString); // Convert ISO string to Date object in UTC
                    const dateTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);
                    // const isoString=ticket.dateTimeCreated;
                    // const dateTime=new Date(isoString);
                    const year = dateTime.getUTCFullYear();
                    const month = dateTime.getUTCMonth() + 1;
                    const day = dateTime.getUTCDate();
                    const formattedMonth = month.toString().padStart(2, '0');
                    const formattedDay = day.toString().padStart(2, '0');
                    const hours = dateTime.getUTCHours();
                    const minutes = dateTime.getUTCMinutes();
                    const formattedHours = hours.toString().padStart(2, '0');
                    const formattedMinutes = minutes.toString().padStart(2, '0');
                    const investigator=investigators.find((investigator)=>investigator.id===ticket.investigatorID)
                    return(
                    <tr onClick={()=>{handleViewTicket(ticket,investigator)}} className={`hover:bg-slate-300 ${i % 2 === 0 ? 'bg-[#fefefe] '  : 'bg-[#eaf3ff] '} px-4 py-2`}>
                      <td className="w-[5%] px-4 py-4">{"T"+ticket.ticketID}</td>
                      <td className="w-[10%] px-4 py-4">{formattedDay+"/"+formattedMonth+"/"+year}</td>
                      <td className="w-[10%] px-4 py-4">{formattedHours+":"+formattedMinutes}</td>
                      <td className="w-[20%] px-4 py-4">{ticket.category}</td>
                      <td className="w-[20%] px-4 py-4">{ticket.subject}</td>
                      <td className="w-[20%] px-4 py-4">{investigator?investigator.name:"-"}</td>
                      <td className="w-[7%] px-4 py-4">{ticket.status}</td>
                    </tr>
                  )})}
                </tbody>
              </table>
        
        }
        </div>
        {/* <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-[#2C74D8] rounded">1</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">2</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">3</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
        </div> */}
        </div>
    )
}

export default MyTickets;