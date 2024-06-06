import { useEffect,useState } from "react";
import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate,useLocation } from 'react-router-dom';
// import { ReactComponent as DropDownArrow } from "../../../public/";
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
  // const [currentRecords,setCurrentRecords] = useState([]);
  const [filteredData,setFilteredData]=useState([])
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const [isSearchByDropDownActive, setIsSearchByDropDownActive] =
  useState(false);
  const [searchBy, setSearchBy] = useState("Ticket ID");
  const [keyword, setKeyword] = useState("");
  const fields = ["Ticket ID", "Employee ID","Category","Status"];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const SearchBy = () => {
    return (
      <div id="searching" className=" h-7">
        <button
          className="flex h-full w-[160px] rounded-md px-2 text-white bg-blue-700 hover:bg-blue-900 hover:scale-105 justify-center items-center"
          onClick={() => {
            setIsSearchByDropDownActive(!isSearchByDropDownActive);
          }}
        >
          {searchBy}
          <img src="/caret-down.png" className="w-3 h-5 ml-2 fill-white" />
        </button>
        {isSearchByDropDownActive && (
          <div className="absolute w-[160px] z-10 max-h-[20%] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
            {fields.map((field) => (
              <button
                onClick={() => {
                  setSearchBy(field);
                  setIsSearchByDropDownActive(!isSearchByDropDownActive);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {field}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(()=>{
    const fetchTickets=async()=>{
      const response= await axios.get("http://localhost:5000/api/tickets/")
      console.log("Ticket Response:",response.data);
      setAllTickets(response.data);
      const allInvestigatorIDs=response.data.map((ticket)=>(ticket.investigatorID))
      setFilteredData(allTickets.slice(indexOfFirstRecord, indexOfLastRecord))
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

  useEffect(() => {
      const hold = allTickets.filter((ticket) => {
        let modifiedKeyword=keyword.toLowerCase();
        if(searchBy === "Ticket ID"||searchBy === "Employee ID"){
          modifiedKeyword=modifiedKeyword.startsWith("e") || modifiedKeyword.startsWith("t")? modifiedKeyword.substring(1):modifiedKeyword
        }
        if (
          searchBy === "Ticket ID" &&
          ticket.ticketID.toString().toLowerCase().includes(modifiedKeyword)
        ) {
          return ticket;
        } else if (
          searchBy === "Employee ID" &&
          ticket.employeeID.toString().toLowerCase().includes(modifiedKeyword)
        ) {
          return ticket;
        } else if (
          searchBy === "Category" &&
          ticket.category.toString().toLowerCase().includes(modifiedKeyword)
        ) {
          return ticket;
        } else if (
          searchBy === "Status" &&
          ticket.status.toString().toLowerCase().includes(modifiedKeyword)
        ) {
          return ticket;
        } 

        // else {
        //  return ticket;
        // }
      });
      setFilteredData(hold);
  }, [keyword, searchBy, allTickets]);


    return(
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <p className="text-lg">Investigate and resolve non-compliance</p>
        </div>
        <div className="flex justify-end pt-4 pb-2">
        <div className="flex border rounded-e-md w-fit mr-10 h-7">
          <SearchBy />
          <input
            className="w-60 px-2 h-full border-l-0 focus:border-l-0 focus:ring-0 rounded-md"
            type="text"
            id="keyword"
            placeholder={"search by " + searchBy}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>
      </div>
        {/* {allTickets.length===0?<p className="text-2xl font-bold">No ticket</p>: */}
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
              {currentRecords.length===0&&<p className="flex text-2xl text-center w-full items-center justify-center font-bold py-5">No record</p>}
              <div className="flex justify-center items-center mt-6">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 ml-2 text-sm rounded ${currentPage === i + 1 ? 'bg-[#2C74D8] text-white' : 'text-black bg-gray-300'}`}>{i + 1}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
            </div>
        </div>
                {/* } */}
      </div>
      
    )
}

export default AllEmployeeTickets;