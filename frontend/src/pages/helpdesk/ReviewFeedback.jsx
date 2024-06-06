import TopNavBlack from "../../components/TopNavBlack"
import { useLocation } from 'react-router-dom';
import Rating from 'react-rating';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios'

function Feedback(){
  const navigate = useNavigate();

  const location = useLocation();
  const feedback = location.state;
  
  const handleBack=()=>{
    navigate('/helpdesk/reviewFeedbacks');
  }

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
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Feedback | F{feedback.feedbackID} </h1>
        </div>
        <div className="flex w-[90%] my-2">
            <div className="flex w-[30%] mr-5">
              <div className="font-bold text-left mr-10">Submission Date</div>
              <div className="border rounded-lg w-[50%] text-left pl-5">{formattedDay+"/"+formattedMonth+"/"+year}</div>
            </div>
            <div className="flex w-[30%] ml-5">
              <div className="font-bold text-left mr-10">Submission Time</div>
              <div className="border rounded-lg w-[50%] text-left pl-5">{formattedHours+":"+formattedMinutes}</div>
            </div>
        </div>
        <p className="text-2xl font-bold text-left mt-16">Satisfactory</p>
        <div className="flex items-start mt-2">
          <Rating
            className=""
            initialRating={feedback.rating}
            emptySymbol={<FaRegStar className="h-10 w-12 mx-2 text-yellow-500 " />}
            fullSymbol={<FaStar className="h-10 w-12 mx-2 text-yellow-500 "/>}
            readOnly={true}
            style={{ pointerEvents: "none" }}
          />
        </div>
        <p className="text-2xl font-bold text-left mt-16">Share your thoughts</p>
        <div className="flex justify-start">
          <textarea
              value={feedback.feedbackComment===""?"No comment":feedback.feedbackComment}
              className="border rounded-lg h-40 w-[70%] p-2 resize-none overflow-auto bg-[#eaf3ff] border-gray-300"
              placeholder="Your thoughts are valuable to us"
              readOnly
            />
        </div>
        <div className="flex my-10 justify-center items-center">
          <button className="mx-5 bg-[#2C74D8] p-2 rounded-lg text-[#FFFFFF] hover:scale-110 transition-transform" onClick={handleBack}>Back</button>
        </div>
      </div>
  )
}

export default Feedback;