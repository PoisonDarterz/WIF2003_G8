import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate,useLocation } from 'react-router-dom';

function ResolveTicket(){
  const navigate=useNavigate()
  const location=useLocation()
  const ticket=location.state

  const handleSave=()=>{
    navigate("/helpdesk/allEmployeeTickets")
  }

  const handleCancelSave=()=>{
    navigate("/helpdesk/allEmployeeTickets")
  }
    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Ticket | {ticket.ticketID}</h1>
          <p className="text-lg">Resolving ticket {ticket.ticketID}</p>
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
            {ticket.attachment!==null?<div className="w-[75%] border rounded-lg text-left pl-5"></div>:<div className="w-[75%] border rounded-lg text-left pl-5">No attachement</div>}
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
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" onClick={handleCancelSave}>Cancel</button>
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" onClick={handleSave}>Save</button>
        </div>
        </div>
    )
}

export default ResolveTicket;