import { useNavigate } from "react-router-dom";
import TopNavBlack from "../../components/TopNavBlack"

function AddNewTicket(){
  const navigate=useNavigate();

  const handleCancelAddTicket=()=>{
    navigate('/helpdesk/');
  }
    return(
        <div className="p-8">
          <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
            <TopNavBlack />
          </div>
          <div className="mt-8 mb-4 text-left">
            <h1 className="text-2xl font-bold">Add new ticket</h1>
            <p className="text-lg">Clear and thorough descriptions help us address your issue more effectively</p>
          </div>
          <form>

          </form>
          <div className="flex my-10 justify-center items-center">
            <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" onClick={handleCancelAddTicket}>Cancel</button>
            <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" >Submit</button>
          </div>
        </div>
    )
}

export default AddNewTicket;