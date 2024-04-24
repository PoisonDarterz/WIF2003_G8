import { useNavigate } from "react-router-dom";
import TopNavBlack from "../../components/TopNavBlack"
import {useState} from 'react'

function AddNewTicket(){
  const navigate=useNavigate();

  const handleCancelAddTicket=()=>{
    navigate('/helpdesk/');
  }

  const [notification, setNotification] = useState(null);
  const handleSubmit=(event)=>{
    event.preventDefault()
    setNotification("Ticket submitted successfully!");
    setTimeout(() => {
      setNotification(null);
      navigate("/helpdesk/");
    }, 2000);
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
          <form className="flex flex-col mx-20 my-10" onSubmit={handleSubmit}>
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Ticket ID</label>
              <input
                className="border rounded-lg w-60 h-fit"
                type="text"
                id="ticketID"
                value="T007"
                readonly
              >
              </input>
            </div>  
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Category</label>
              <select id="category" className="border rounded-lg w-60" >
                <option value="General">Select</option>
                <option value="Financial misconduct">Financial misconduct</option>
                <option value="Data security breaches">Data security breaches</option>
                <option value="Discrimination">Discrimination</option>
                <option value="Workplace harrasment">Workplace harrasment</option>
                <option value="Others">Others</option>
              </select>
            </div>  
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Subject</label>
              <input
                className="border rounded-lg w-[70%] h-fit"
                type="text"
                id="subject"
                placeholder="Subject"
              >
              </input>
            </div>
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Detail</label>
              <textarea
                className="w-[70%] resize-none border rounded-lg"
                id="detail"
                placeholder="Provide as much detail as possible"
                rows="4"
              >
              </textarea>
            </div>       
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Attachment</label>
              <input
                className="hidden"
                type="file"
                id="attachment"
              />
              <button type="button" className="w-[70%] resize-none border rounded-lg p-3"
                onClick={()=>document.getElementById('attachment').click()}>
                <img src="/AddFile.png" alt="upload file"/>
              </button>
            </div>
            {notification && (
            <div>Ticket submitted successfully!</div>
      )}
            <div className="flex my-10 justify-center items-center">
              <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" onClick={handleCancelAddTicket}>Cancel</button>
              <button type="submit" className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF]" >Submit</button>
            </div>              
          </form>

        </div>
    )
}

export default AddNewTicket;