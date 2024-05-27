import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewProfile() {
  const {id} = useParams();
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const skillList = [
    { skill: "Market Analysis", desc: "desc", image: "/blank.png" },
    { skill: "Negotiation", desc: "desc", image: "/blank.png" }
  ];

  const awardList = [
    { award: "award1", desc: "desc", image: "/blank.png" },
    { award: "award2", desc: "desc", image: "/blank.png" }
  ];

  const handleViewImage = (url) => {
    setImageUrl(url);
    setShowImage(true);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  useEffect(() => {
    console.log(`Fetching data for employee ID: ${id}`);
    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        console.log("Fetched employee data:", response.data);
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
      setIsLoading(false);
    };

    fetchEmployee();
  }, [id]); 
  
  if (isLoading) { // Render loading message if data is still being fetched
    return <div>Loading...</div>;
  }

  return (
    <form>
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Profile of {employeeData.name}</h1>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-10 gap-x-4">
          {/* Left Column */}
          <div className="bg-[#eaf3ff] p-5 sm:col-span-2 text-left rounded-lg">
            <div>
              <img
                className="h-48 w-36 rounded-lg cursor-pointer"
                src="/Profile_image.jpg"
                alt="Profile Picture"
                onClick={() => handleViewImage("/Profile_image.jpg")}
              />
              <h2 className="mt-5 font-bold">Employee ID</h2>
              <p>{employeeData.id}</p>

              <h2 className="mt-5 font-bold">Name</h2>
              <p>{employeeData.name}</p>

              <h2 className="mt-5 font-bold">Contact</h2>
              <p>
                {employeeData.email.email} <br />
                +60 19 442 2659
              </p>

              <h2 className="mt-5 font-bold">Department</h2>
              <p>{employeeData.roleId.departmentId.departmentName}</p>

              <h2 className="mt-5 font-bold">Job Title</h2>
              <p>{employeeData.roleId.roleName}</p>

              <h2 className="mt-5 font-bold">Joined Since</h2>
              <p>26 January 2015</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-[#eaf3ff] p-5 sm:col-span-8 text-left ml-5 rounded-lg">
            <h2 className="font-bold">Bio</h2>
            <p>
              I am an experienced Sales Manager with a strong track record in
              driving revenue growth and exceeding sales targets. With over a
              decade of experience in the sales industry, I have developed a
              deep understanding of market dynamics and customer needs. My role
              involves leading a team of sales professionals, developing
              strategic sales plans, and fostering strong relationships with
              clients. I thrive in fast-paced environments and am passionate
              about delivering exceptional results.
            </p>
            <div className="border-b border-gray-900/10 pb-12"></div>
            <h2 className="mt-5 font-bold">Education and Experiences</h2>
            <p>Bachelor of Finance, University Malaya</p>
            <div className="border-b border-gray-900/10 pb-12"></div>

            <table className="mt-5 w-full table-auto rounded-lg">
              <thead>
                <tr className="text-md font-medium text-black rounded-lg">
                  <th className="w-[30%] px-4 py-2 bg-gray-200 font-bold">Skills</th>
                  <th className="w-[50%] px-4 py-2 bg-gray-200 font-bold">Description</th>
                  <th className="w-[20%] px-4 py-2 bg-gray-200 font-bold">Support Document</th>
                </tr>
              </thead>
              <tbody className="text-md font-normal text-gray-700">
                {skillList.map((skill, i) => (
                  <tr
                    className={`${
                      i % 2 === 0 ? "bg-[#fefefe]" : "bg-gray-50"
                    } px-4 py-2`}
                    key={i}
                  >
                    <td className="w-[30%] px-4 py-4">{skill.skill}</td>
                    <td className="w-[50%] px-4 py-4">{skill.desc}</td>
                    <td className="w-[20%] px-4 py-4">
                      <img
                        className="h-20 w-20 cursor-pointer"
                        src={skill.image}
                        alt={skill.skill}
                        onClick={() => handleViewImage(skill.image)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-b border-gray-900/10 pb-12"></div>

            <table className="mt-5 w-full table-auto rounded-lg">
              <thead>
                <tr className="text-md font-medium text-black rounded-lg">
                  <th className="w-[30%] px-4 py-2 bg-gray-200 font-bold">Professional Affiliations or Awards</th>
                  <th className="w-[50%] px-4 py-2 bg-gray-200 font-bold">Description</th>
                  <th className="w-[20%] px-4 py-2 bg-gray-200 font-bold">Support Document</th>
                </tr>
              </thead>
              <tbody className="text-md font-normal text-gray-700">
                {awardList.map((award, i) => (
                  <tr
                    className={`${
                      i % 2 === 0 ? "bg-[#fefefe]" : "bg-gray-50"
                    } px-4 py-2`}
                    key={i}
                  >
                    <td className="w-[30%] px-4 py-4">{award.award}</td>
                    <td className="w-[50%] px-4 py-4">{award.desc}</td>
                    <td className="w-[20%] px-4 py-4">
                      <img
                        className="h-20 w-20 cursor-pointer"
                        src={award.image}
                        alt={award.award}
                        onClick={() => handleViewImage(award.image)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-b border-gray-900/10 pb-12"></div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to="/info/editEmployeeProfile">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for showing the enlarged image */}
      {showImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-xl p-4 bg-white rounded-lg">
            <img src={imageUrl} alt="Enlarged Image" className="w-full" />
            <button
              onClick={handleCloseImage}
              className="p-2 mr-1 absolute top-2 right-2 text-white hover:text-gray-400"
            >
              ╳  
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
