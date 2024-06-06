import TopNavBlack from "../../components/TopNavBlack"
import { useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from "axios";

function Feedbacks(){
  const navigate=useNavigate();
  const [feedbacks,setFeedbacks]=useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const [currentRecords,setCurrentRecords] = useState([]);
  const [filteredData,setFilteredData]=useState([])
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const [isSearchByDropDownActive, setIsSearchByDropDownActive] =
  useState(false);
  const [searchBy, setSearchBy] = useState("Feedback ID");
  const [keyword, setKeyword] = useState("");
  const fields = ["Feedback ID","Category","Rating"];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewFeedback=(feedback)=>{
    navigate(`/helpdesk/reviewFeedbacks/${feedback.feedbackID}`,{state:feedback})
  }

  const SearchBy = () => {
    return (
      <div id="searching" className=" h-7">
        <button
          className="flex h-full w-[160px] rounded-md px-2 text-white bg-blue-700 hover:bg-blue-900 hover:scale-105 justify-center items-center"
          onClick={() => {
            setIsSearchByDropDownActive(!isSearchByDropDownActive);
          }}
        >
          {searchBy}
          <img src="/caret-down.png" className="w-3 h-5 ml-2 fill-white" />
        </button>
        {isSearchByDropDownActive && (
          <div className="absolute w-[160px] z-10 max-h-[20%] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
            {fields.map((field) => (
              <button
                onClick={() => {
                  setSearchBy(field);
                  setIsSearchByDropDownActive(!isSearchByDropDownActive);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {field}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(()=>{
    const fetchFeedbacks=async()=>{
      const response = await axios.get("http://localhost:5000/api/feedbacks/", {
        withCredentials: true,
      });
      console.log("Feedbacks Response:",response.data);
      setFeedbacks(response.data);
      setFilteredData(feedbacks.slice(indexOfFirstRecord, indexOfLastRecord))

    }
    fetchFeedbacks();
  },[])

  useEffect(() => {
    const hold = feedbacks.filter((feedback) => {
      let modifiedKeyword=keyword.toLowerCase();
      if(searchBy === "Feedback ID"){
        modifiedKeyword=modifiedKeyword.startsWith("f")? modifiedKeyword.substring(1):modifiedKeyword
      }
      if (
        searchBy === "Feedback ID" &&
        feedback.feedbackID.toString().toLowerCase().includes(modifiedKeyword)
      ) {
        return feedback;
      }  else if (
        searchBy === "Category" &&
        feedback.category.toString().toLowerCase().includes(modifiedKeyword)
      ) {
        return feedback;
      } else if (
        searchBy === "Rating" &&
        feedback.rating.toString().toLowerCase().includes(modifiedKeyword)
      ) {
        return feedback;
      } 

      // else {
      //  return ticket;
      // }
    });
    setFilteredData(hold);
}, [keyword, searchBy, feedbacks]);

    return(
        <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Feedbacks</h1>
          <p className="text-lg ">Review all employees' feedback</p>
        </div>
        <div className="flex justify-end pt-4 pb-2">
        <div className="flex border rounded-e-md w-fit mr-10 h-7">
          <SearchBy />
          <input
            className="w-60 px-2 h-full border-l-0 focus:border-l-0 focus:ring-0 rounded-md"
            type="text"
            id="keyword"
            placeholder={"search by " + searchBy}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>
      </div>
        {/* {feedbacks.length===0?<p className="text-2xl font-bold">No feedback</p>: */}
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
                    {currentRecords.map((feedback, i) => {
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
                        <td className="w-[20%] px-4 py-4">{feedback.feedbackComment===""?"No comment":feedback.feedbackComment}</td>
                        <td className="w-[20%] px-4 py-4">{feedback.rating===-1?"-":feedback.rating}</td>
                      </tr>
                    )})}
                  </tbody>
                </table>
                {currentRecords.length===0&&<p className="flex text-2xl text-center w-full items-center justify-center font-bold py-5">No record</p>}
                        <div className="flex justify-center items-center mt-6">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm text-white bg-gray-500 rounded">Previous</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 ml-2 text-sm rounded ${currentPage === i + 1 ? 'bg-[#2C74D8] text-white' : 'text-black bg-gray-300'}`}>{i + 1}</button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 text-sm text-white bg-gray-500 rounded">Next</button>
                      </div>
          

        </div>
                      {/* } */}
        </div>
    )
}

export default Feedbacks;