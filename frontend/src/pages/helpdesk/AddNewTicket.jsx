import { useNavigate } from "react-router-dom";
import TopNavBlack from "../../components/TopNavBlack"
import {useState} from 'react'
import { FaFileImage, FaFilePdf, FaFileWord, FaFileExcel} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";

function AddNewTicket(){
  const [files,setFiles]=useState([]);
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [formData,setFormData]=useState({
    dateTimeCreated: new Date(),
    category: "",
    subject: "",
    detail: "",
    attachment: "",
  })
  const navigate=useNavigate();

  const handleFileChange=(event)=>{
    const uploadedFile=event.target.files[0];
    setFiles([...files,uploadedFile]);
  }

  const handleRemoveFile=(i)=>{
    setFiles((files) => files.filter((_, index) => index !== i));
  }

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "image/jpeg":
      case "image/png":
        return <FaFileImage className="w-10 h-10" />;
      case "application/pdf":
        return <FaFilePdf className="w-10 h-10" />;
      case "application/msword":
        return <FaFileWord className="w-10 h-10" />;
      case "application/vnd.ms-excel":
        return <FaFileExcel className="w-10 h-10" />;
      default:
        return <FaFileImage className="w-10 h-10" />; // Default icon for unknown file types
    }
  };

  const handleCancelAddTicket=()=>{
    navigate('/helpdesk/');
  }

  const [notification, setNotification] = useState(null);

  const handleSubmit=async(event)=>{
    event.preventDefault()
    setNotification("Ticket submitted successfully!");
    setIsSubmitted(true);
    try{
     const response=await axios.post("http://localhost:5000/api/tickets/submitTicket",formData,{withCredentials:true});
     console.log("New ticket submitted succesfully:",response.data)
     setFormData({
      dateTimeCreated: new Date(),
      category: "",
      subject: "",
      detail: "",
      attachment: "",
    })
    }catch(error){
      console.error("Error send request to submit ticket:",error);
    }
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
              <label className="font-bold w-[12%] text-start">Category</label>
              <select id="category" className="border rounded-lg w-60 pl-2" 
              value={formData.category} onChange={(e)=>{setFormData((prevData)=>({...prevData,category:e.target.value}))}}>
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
                className="border rounded-lg w-[70%] h-fit pl-2"
                type="text"
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e)=>{setFormData((prevData)=>({...prevData,subject:e.target.value}))}}
                readOnly={isSubmitted}
              >
              </input>
            </div>
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Detail</label>
              <textarea
                className="w-[70%] resize-none border rounded-lg pl-2"
                id="detail"
                placeholder="Provide as much detail as possible"
                rows="4"
                value={formData.detail}
                onChange={(e)=>{setFormData((prevData)=>({...prevData,detail:e.target.value}))}}
                required
                readOnly={isSubmitted}
              >
              </textarea>
            </div> 
            <div className="flex my-3">
              <label className="font-bold w-[12%] text-start">Attachment</label>
              <div className="flex w-[70%] resize-none border rounded-lg p-3">
                {files.map((file,index)=>(
                  <div className="pr-5">
                    {getFileIcon(file.type)}
                    <div className="flex">
                      <p className="flex w-24 overflow-hidden whitespace-nowrap overflow-ellipsis" title={file.name}>{file.name}</p>
                      <button><MdCancel onClick={()=>handleRemoveFile(index)}/></button>

                    </div>
                  </div>
                  
                ))}
                <input
                  className="hidden"
                  type="file"
                  id="attachment"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col">
                  <button type="button"
                    onClick={()=>document.getElementById('attachment').click()}>
                    <img src="/AddFile.png" alt="upload file" className="w-10 h-10"/>
                  </button>
                  <p>Upload file</p>
                </div>
              </div>
            </div>
                
            {notification && (
            <div className="flex bg-green-300 justify-center items-center rounded-lg">Ticket submitted successfully!</div>
            )}
            {isSubmitted?
            <div className="flex my-10 justify-center items-center">
              <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleCancelAddTicket}>Back</button>
            </div>  
            :
            <div className="flex my-10 justify-center items-center">
              <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleCancelAddTicket}>Cancel</button>
              <button type="submit" className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" >Submit</button>
            </div>  
            }
          </form>

        </div>
    )
}

export default AddNewTicket;