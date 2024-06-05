import TopNavBlack from "../../components/TopNavBlack"
import { useLocation } from 'react-router-dom';
import Rating from 'react-rating';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios'

function SubmitFeedback(){
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;
  const category = data && data.category;
  const description = data && data.description;

  const [feedback,setFeedback]=useState({
    category: category,
    rating: 0,
    feedbackComment: "",
  })
  
  const handleCancelFeedback=()=>{
    navigate('/helpdesk/feedback');
  }

  const handleSubmit=async(event)=>{
    event.preventDefault()
    try{
     const response=await axios.post("http://localhost:5000/api/feedbacks/submitFeedback",feedback,{withCredentials:true});
    //  console.log("New feedback submitted succesfully:",response.data)
     setFeedback({
      category: "",
      rating: "",
      feedbackComment: "",
    })
    navigate('/helpdesk/feedback');
    }catch(error){
      console.error("Error send request to submit feedback:",error);
    }

  }


  return(
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Feedback | {category} </h1>
          <p className="text-lg">{description}</p>
        </div>
        <p className="text-2xl font-bold text-left mt-16">Satisfactory</p>
        <div className="flex items-start mt-2">
          <Rating
            className=""
            initialRating={feedback.rating}
            emptySymbol={<FaRegStar className="h-10 w-12 mx-2 text-yellow-500 " />}
            fullSymbol={<FaStar className="h-10 w-12 mx-2 text-yellow-500 "/>}
            onChange={(value)=>{setFeedback((prevData)=>({...prevData,rating:value}))}}
          />
        </div>
        <p className="text-2xl font-bold text-left mt-16">Share your thoughts</p>
        <div className="flex justify-start">
          <textarea
              value={feedback.feedbackComment}
              onChange={(e)=>{setFeedback((prevData)=>({...prevData,feedbackComment:e.target.value}))}}
              className="border rounded-lg h-40 w-[70%] p-2 resize-none overflow-auto bg-[#eaf3ff] border-gray-300"
              placeholder="Your thoughts are valuable to us"
            />
        </div>
        <div className="flex my-10 justify-center items-center">
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleCancelFeedback}>Cancel</button>
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  )
}

export default SubmitFeedback;