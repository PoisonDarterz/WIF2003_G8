import TopNavBlack from "../../components/TopNavBlack"
import { useLocation,useNavigate } from "react-router-dom";

function ReviewTicket({}){
  const navigate=useNavigate()
  const location=useLocation()
  const ticket=location.state;
  console.log("ticket:",ticket)

  const handleBackToMyTickets=()=>{
    navigate("/helpdesk/")
  }
    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">My ticket | {ticket.ticketID}</h1>
          <p className="text-lg">Reviewing ticket {ticket.ticketID}</p>
        </div>
        <div className="flex flex-col mx-10">
          <div className="flex w-[90%] my-2">
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Ticket ID</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{ticket.ticketID}</div>
            </div>
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Report Date</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{ticket.reportDate}</div>
            </div>
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Report Time</div>
              <div className="border rounded-lg w-[50%] text-left pl-5">{ticket.reportTime}</div>
            </div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Employee ID</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{ticket.employeeID}</div>
            </div>
            <div className="flex w-[30%]">
              <div className="font-bold w-[50%] text-left">Employee Name</div>
              <div className="border rounded-lg w-[40%] text-left pl-5">{ticket.employeeName}</div>
            </div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Category</div>
            <div className="w-[75%] border rounded-lg text-left pl-5">{ticket.category}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Assigned Investigator</div>
            <div className="w-[75%] border rounded-lg text-left pl-5">{ticket.assignedInvestigator}</div>
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
            {ticket.attachment!==null?<div className="w-[75%] border rounded-lg text-left pl-5"></div>:<div className="w-[75%] border rounded-lg text-left pl-5">No attachement</div>}
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Investigation Update</div>
            <div className="w-[75%] border rounded-lg text-left p-2 pl-5">{ticket.investigationUpdate}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Status</div>
            <div className="w-[15%] border rounded-lg text-left pl-5">{ticket.status}</div>
          </div>
        </div>
        <div className="flex my-10 justify-center items-center">
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" onClick={handleBackToMyTickets}>Back</button>
        </div>
        </div>
    )
}

export default ReviewTicket;