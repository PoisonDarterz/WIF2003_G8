import TopNavBlack from "../../components/TopNavBlack"
import { useLocation,useNavigate } from "react-router-dom";
import { FaFileImage, FaFilePdf, FaFileWord, FaFileExcel} from "react-icons/fa";

function ReviewTicket({}){
  const navigate=useNavigate()
  const location=useLocation()
  const ticket=location.state;
  console.log("ticket:",ticket)

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

  const handleBackToMyTickets=()=>{
    navigate("/helpdesk/")
  }

  const fileName=ticket.attachment.substring(ticket.attachment.lastIndexOf('/') + 1);

    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">My ticket | {"T"+ticket.ticketID}</h1>
          <p className="text-lg">Reviewing ticket {"T"+ticket.ticketID}</p>
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
            <div className="font-bold w-[15%] text-left">Category</div>
            <div className="w-[75%] border rounded-lg text-left pl-5">{ticket.category}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Assigned Investigator</div>
            <div className="w-[75%] border rounded-lg text-left pl-5">{ticket.investigator?ticket.investigator.name:"-"}</div>
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
            <div className="w-[75%] border rounded-lg text-left p-2 pl-5">{ticket.investigationUpdate===""?"-":ticket.investigationUpdate}</div>
          </div>
          <div className="flex w-[90%] my-2">
            <div className="font-bold w-[15%] text-left">Status</div>
            <div className="w-[15%] border rounded-lg text-left pl-5">{ticket.status}</div>
          </div>
        </div>
        <div className="flex my-10 justify-center items-center">
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleBackToMyTickets}>Back</button>
        </div>
        </div>
    )
}

export default ReviewTicket;