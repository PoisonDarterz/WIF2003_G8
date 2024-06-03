import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate,useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";
import axios from 'axios'

function ResolveTicket(){
  const navigate=useNavigate()
  const location=useLocation()
  const ticket=location.state

  const isoString=ticket.dateTimeCreated;
  const dateTime=new Date(isoString);
  const year = dateTime.getUTCFullYear();
  const month = dateTime.getUTCMonth() + 1;
  const day = dateTime.getUTCDate();
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const [employeeName,setEmployeeName]=useState("");

  const handleSave=()=>{
    navigate("/helpdesk/allEmployeeTickets")
  }

  const handleCancelSave=()=>{
    navigate("/helpdesk/allEmployeeTickets")
  }

  useEffect(()=>{
    const fetchEmployeeByID=async()=>{
      const response = await axios.get(`http://localhost:5000/api/employees/${ticket.employeeID}`, {
        withCredentials: true,
      });
      console.log("Employee by ID:",response.data);
      setEmployeeName(response.data.name);
    }
    fetchEmployeeByID();
  },[])

    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Ticket | {"T"+ticket.ticketID}</h1>
          <p className="text-lg">Resolving ticket {"T"+ticket.ticketID}</p>
        </div>
        <div className="flex flex-col mx-10">
          <div className="flex w-[90%] my-2">
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Ticket ID</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{"T"+ticket.ticketID}</div>
            </div>
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Report Date</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{formattedDay+"/"+formattedMonth+"/"+year}</div>
            </div>
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Report Time</div>
              <div className="border rounded-lg w-[50%] text-left pl-5">{formattedHours+":"+formattedMinutes}</div>
            </div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Employee ID</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{"E"+ticket.employeeID}</div>
            </div>
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Employee Name</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{employeeName}</div>
            </div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Category</div>
            <div className="w-[75%] border rounded-lg text-left pl-5">{ticket.category}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Assigned Investigator</div>
            <select id="category" className="w-[75%] border rounded-lg text-left pl-5" >
                <option value="non">Select</option>
                <option value="Jonas">Jonas</option>
                <option value="Ing Zhen">Ing Zhen</option>
                <option value="James">James</option>
                <option value="Hui Min">Hui Min</option>
                <option value="Ching Ying">Ching Ying</option>
            </select>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Subject</div>
            <div className="w-[75%] border rounded-lg text-left pl-5">{ticket.subject}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Detail</div>
            <div className="w-[75%] border rounded-lg text-left p-2 pl-5">{ticket.detail}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Attachment</div>
            {ticket.attachment!==""?<div className="w-[75%] border rounded-lg text-left pl-5"></div>:<div className="w-[75%] border rounded-lg text-left pl-5">No attachement</div>}
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Investigation Update</div>
            <textarea
                className="w-[75%] border rounded-lg text-left p-2 pl-5"
                id="detail"
                placeholder="Update the investigation process"
                rows="4"
            />
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Resolved</div>
              <label className="mr-5">
                <input
                  className="mx-2"
                  type="radio"
                  id="resolved"
                  name="status"
                  value="resolved"
                  // checked={selectedStatus === 'in progress'}
                  // onChange={handleStatusChange}
                />
                Yes
              </label>
              <label className="mr-5">
                <input
                  className="mx-2"
                  type="radio"
                  id="in progress"
                  name="status"
                  value="in progress"
                  // checked={selectedStatus === 'resolved'}
                  // onChange={handleStatusChange}
                />
                No
              </label>
          </div>
        </div>
        <div className="flex my-10 justify-center items-center">
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleCancelSave}>Cancel</button>
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleSave}>Save</button>
        </div>
        </div>
    )
}

export default ResolveTicket;