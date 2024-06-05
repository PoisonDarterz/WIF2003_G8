import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from "axios";

function Feedbacks(){
  const navigate=useNavigate();
  const [feedbacks,setFeedbacks]=useState([]);

  const handleViewFeedback=(feedback)=>{
    navigate(`/helpdesk/reviewFeedbacks/${feedback.feedbackID}`,{state:feedback})
  }

  useEffect(()=>{
    const fetchFeedbacks=async()=>{
      const response = await axios.get("http://localhost:5000/api/feedbacks/", {
        withCredentials: true,
      });
      console.log("Feedbacks Response:",response.data);
      setFeedbacks(response.data);
    }
    fetchFeedbacks();
  },[])

    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Feedbacks</h1>
          <p className="text-lg ">Review all employees' feedback</p>
        </div>
        <div className="mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-medium text-center text-gray-700 rounded-lg bg-gray-200">
              <th className="w-[7%] px-4 py-2">Feedback ID</th>
              <th className="w-[10%] px-4 py-2">Date</th>
              <th className="w-[10%] px-4 py-2">Time</th>
              <th className="w-[20%] px-4 py-2">Category</th>
              <th className="w-[20%] px-4 py-2">Detail</th>
              <th className="w-[20%] px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {feedbacks.map((feedback, i) => {
              const isoString=feedback.dateTimeCreated;
              const utcDate = new Date(isoString); // Convert ISO string to Date object in UTC
              const dateTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);
              // const isoString=feedback.dateTimeCreated;
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
              return(
              <tr onClick={()=>{handleViewFeedback(feedback)}} className={`hover:bg-slate-300 ${i % 2 === 0 ? 'bg-[#fefefe] '  : 'bg-[#eaf3ff] '} px-4 py-2`}>
                <td className="w-[5%] px-4 py-4">{"F"+feedback.feedbackID}</td>
                <td className="w-[10%] px-4 py-4">{formattedDay+"/"+formattedMonth+"/"+year}</td>
                <td className="w-[10%] px-4 py-4">{formattedHours+":"+formattedMinutes}</td>
                <td className="w-[20%] px-4 py-4">{feedback.category}</td>
                <td className="w-[20%] px-4 py-4">{feedback.detail}</td>
                <td className="w-[20%] px-4 py-4">{feedback.rating}</td>
              </tr>
            )})}
          </tbody>
        </table>
        </div>
        {/* <div className="flex justify-center items-center mt-6">
          <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-[#2C74D8] rounded">1</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">2</button>
          <button className="px-4 py-2 ml-2 text-sm text-black bg-gray-300 rounded">3</button>
          <button className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
        </div> */}
        </div>
    )
}

export default Feedbacks;