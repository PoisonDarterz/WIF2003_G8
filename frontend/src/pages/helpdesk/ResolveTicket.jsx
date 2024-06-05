import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate,useLocation } from 'react-router-dom';
import {useState,useEffect} from "react";
import { FaFileImage, FaFilePdf, FaFileWord, FaFileExcel} from "react-icons/fa";
import axios from 'axios'

function ResolveTicket(){
  const navigate=useNavigate()
  const location=useLocation()
  const hold=location.state
  const [ticket,setTicket]=useState(hold)

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

  const [employeeName,setEmployeeName]=useState("");
  const [admins,setAdmins]=useState([])
  const [assignedInvestigatorID,setAssignedInvestigatorID]=useState(ticket.investigatorID)
  const [status,setStatus]=useState(ticket.status);

  const handleSave=async()=>{
    //Update to database
    assignedInvestigatorID===""?ticket.investigatorID="":ticket.investigatorID=assignedInvestigatorID;
    status==="resolved"?ticket.status="resolved":assignedInvestigatorID===""?ticket.status="pending":ticket.status="in progress";
    if(assignedInvestigatorID===""){
      ticket.status="pending"
    }

    console.log("when save:")
    console.log("assignedInvestigatorID:",assignedInvestigatorID)
    console.log("status:",status)
    try{
      const response=await axios.put(`http://localhost:5000/api/tickets/${ticket._id}`,ticket, {
        withCredentials: true,
      })
      console.log("Updated ticket:",response.data)
    }catch(error){
      console.error("Error updating ticket: ",error)
    }

    console.log("ticket:",ticket)

    navigate("/helpdesk/allEmployeeTickets")
  }

  const handleCancelSave=()=>{
    navigate("/helpdesk/allEmployeeTickets")
  }

  const getFileIcon = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case "jpeg":
      case "jpg":
      case "png":
        return <a href={fileUrl} target="_blank"><FaFileImage className="w-10 h-10" /></a>;
      case "pdf":
        return <a href={fileUrl} target="_blank"><FaFilePdf className="w-10 h-10" /></a>;
      case "doc":
      case "docx":
        return <a href={fileUrl} target="_blank" ><FaFileWord className="w-10 h-10" /></a>;
      case "xls":
      case "xlsx":
        return <a href={fileUrl} target="_blank"><FaFileExcel className="w-10 h-10" /></a>;
      default:
        return <a href={fileUrl} target="_blank"><FaFileImage className="w-10 h-10" /></a>; // Default icon for unknown file types
    }
  };

  const fileName=ticket.attachment.substring(ticket.attachment.lastIndexOf('/') + 1);

  useEffect(()=>{
    const fetchEmployeeByID=async()=>{
      const response = await axios.get(`http://localhost:5000/api/employees/${ticket.employeeID}`, {
        withCredentials: true,
      });
      console.log("Employee by ID:",response.data);
      setEmployeeName(response.data.name);
    }

    const fetchAllAdminWithID=async()=>{

      try{
        const response = await axios.get(`http://localhost:5000/api/auth/allAdminID`, {
          withCredentials: true,
        });
        var adminsID=response.data.map((admin)=>(admin.employeeID))

      }catch(error){
        console.error("Error fetching admin ID:",error)
      }

      try{
        const response= await axios.post(`http://localhost:5000/api/employees/employee-Id&Name`,adminsID);
        setAdmins(response.data)

      }catch(error){
        console.log("Error fetching admin name:",error)
      }

      console.log("admins:",admins)

    }

    fetchEmployeeByID();
    fetchAllAdminWithID();
  },[])

  const admin=admins.find((admin)=>admin.id===ticket.investigatorID)
  console.log("admin:",admin)

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
            <select id="category" className="w-[75%] border rounded-lg text-left pl-5" value={assignedInvestigatorID} onChange={(e)=>{setAssignedInvestigatorID(e.target.value)}}>
                <option value="">Select</option>
                {admins.map((admin)=>(
                  <option value={admin.id}>{admin.name}</option>
                ))}                

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
            {ticket.attachment!==""?
            <div className="w-[75%] border rounded-lg text-left pl-5 py-2">
              {getFileIcon(ticket.attachment)}
              <div className="flex">
                <p className="flex w-24 overflow-hidden whitespace-nowrap overflow-ellipsis" title={fileName}>{fileName}</p>
              </div>
            </div>
            :<div className="w-[75%] border rounded-lg text-left pl-5">No attachment</div>}
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Investigation Update</div>
            <textarea
                className="w-[75%] border rounded-lg text-left p-2 pl-5"
                id="detail"
                placeholder="Update the investigation process"
                rows="4"
                value={ticket.investigationUpdate}
                onChange={(e)=>{setTicket((prevTicket)=>({...prevTicket,investigationUpdate:e.target.value}))}}
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
                  value={ticket.status}
                  checked={status === 'resolved'}
                  onChange={(e)=>{setStatus("resolved")}}
                />
                Yes
              </label>
              <label className="mr-5">
                <input
                  className="mx-2"
                  type="radio"
                  id="in progress"
                  name="status"
                  value={ticket.status}
                  checked={status ==='not resolved'||status==="pending"||status==="in progress"}
                  onChange={(e)=>{setStatus("not resolved")}}
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