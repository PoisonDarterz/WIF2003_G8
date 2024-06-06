import { useEffect,useState } from "react";
import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";

function AllEmployeeTickets(){
  const navigate=useNavigate();
  const handleResolveTicket=(i)=>{
    const ticket=allTickets[i]
    navigate("/helpdesk/resolveTicket",{state:ticket})
  }
  const [allTickets,setAllTickets]=useState([])
  const [investigators,setInvestigators]=useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allTickets.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(allTickets.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    const fetchTickets=async()=>{
      const response= await axios.get("http://localhost:5000/api/tickets/")
      console.log("Ticket Response:",response.data);
      setAllTickets(response.data);
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

    console.log("All Investigator:",investigators)
  },[]);
    return(
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <p className="text-lg">Investigate and resolve non-compliance</p>
        </div>
        {allTickets.length===0?<p className="text-2xl font-bold">No ticket</p>:
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
                  {currentRecords.map((ticket, i) => {
                   const isoString=ticket.dateTimeCreated;
                   const utcDate = new Date(isoString); // Convert ISO string to Date object in UTC
                   const dateTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);
                  //  const dateTime=new Date(new Date(isoString).toLocaleString());
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
                    <tr onClick={()=>handleResolveTicket(i)} className={`hover:bg-slate-300 ${i % 2 === 0 ? 'bg-[#fefefe]' : 'bg-[#eaf3ff]'} px-4 py-2`}>
                      <td className="w-[7%] px-4 py-4">{"T"+ticket.ticketID}</td>
                      <td className="w-[9%] px-4 py-4">{"E"+ticket.employeeID}</td>
                      <td className="w-[10%] px-4 py-4">{formattedDay+"/"+formattedMonth+"/"+year}</td>
                      <td className="w-[10%] px-4 py-4">{formattedHours+":"+formattedMinutes}</td>
                      <td className="w-[18%] px-4 py-4">{ticket.category}</td>
                      <td className="w-[18%] px-4 py-4">{ticket.subject}</td>
                      <td className="w-[%] px-4 py-4">{investigator?investigator.name:"-"}</td>
                      <td className="w-[14%] px-4 py-4">{ticket.status}</td>
                    </tr>
                  )})}
                </tbody>
              </table>
              <div className="flex justify-center items-center mt-6">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 ml-2 text-sm rounded ${currentPage === i + 1 ? 'bg-[#2C74D8] text-white' : 'text-black bg-gray-300'}`}>{i + 1}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
            </div>
        </div>
                }
      </div>
      
    )
}

export default AllEmployeeTickets;