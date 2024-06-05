import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const getCurrentUser = () => {
  const role = localStorage.getItem('role');
  const employeeID = localStorage.getItem('employeeID');
  return { role, employeeID };
};

export default function ViewProfile() {
  const {id} = useParams();
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [adminEditProfile, setAdminEditProfile] = useState(false);
  const [userEditProfile, setUserEditProfile] = useState(false);
  const { role, employeeID } = getCurrentUser();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
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
        
        setEmployeeData(response.data);

        setAdminEditProfile(
          role === 'Admin' 
        );

        setUserEditProfile(
          employeeID === response.data.id && role != 'Admin'
        );

      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
      setIsLoading(false);
    };

    fetchEmployee();
  }, [id, role, employeeID]); 
  
  if (isLoading) { 
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

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-x-4">
          {/* Left Column */}
          <div className="bg-[#eaf3ff] p-5 sm:col-span-3 text-left rounded-lg">
            <div>
              <img
                className="h-48 w-36 rounded-lg cursor-pointer"
                src={employeeData.profilePicURL || "/Profile_image.jpg"}
                alt="Profile Picture"
                onClick={() => handleViewImage(employeeData.profilePicURL || "/Profile_image.jpg")}
              />
              <h2 className="mt-5 font-bold">Employee ID</h2>
              <p>{employeeData.id}</p>

              <h2 className="mt-5 font-bold">Name</h2>
              <p>{employeeData.name}</p>

              <h2 className="mt-5 font-bold">Contact</h2>
              <p>
                {employeeData.emailContact} <br />
                {employeeData.phone}
              </p>

              <h2 className="mt-5 font-bold">Department</h2>
              <p>{employeeData.roleId.departmentId.departmentName}</p>

              <h2 className="mt-5 font-bold">Job Title</h2>
              <p>{employeeData.roleId.roleName}</p>

              <h2 className="mt-5 font-bold">Joined Since</h2>
              <p>{formatDate(employeeData.joinedSince)}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-[#eaf3ff] p-5 sm:col-span-9 text-left ml-5 rounded-lg">
            <h2 className="font-bold">Bio</h2>
            <p>
              {employeeData.bio}
            </p>
            <div className="border-b border-gray-900/10 pb-12"></div>
             <table className="mt-5 w-full table-auto rounded-lg">
              <thead>
                <tr className="text-md font-medium text-black rounded-lg">
                  <th className="w-[30%] px-4 py-2 bg-gray-200 font-bold">Education and Experiences</th>
                  <th className="w-[50%] px-4 py-2 bg-gray-200 font-bold">Description</th>
                  <th className="w-[20%] px-4 py-2 bg-gray-200 font-bold">Support Document</th>
                </tr>
              </thead>
              <tbody className="text-md font-normal text-gray-700">
                {employeeData.edu.map((edu, i) => (
                  <tr
                    className={`${i % 2 === 0 ? "bg-[#fefefe]" : "bg-gray-50"} px-4 py-2`}
                    key={i}
                  >
                    <td className="w-[30%] px-4 py-4">{edu.eduTitle}</td>
                    <td className="w-[50%] px-4 py-4">{edu.eduDesc}</td>
                    <td className="w-[20%] px-4 py-4">
                      {edu.eduDocURL ? (
                        <a href={edu.eduDocURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Document</a>
                      ) : (
                        "No Document"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                {employeeData.skills.map((skills, i) => (
                  <tr
                    className={`${i % 2 === 0 ? "bg-[#fefefe]" : "bg-gray-50"} px-4 py-2`}
                    key={i}
                  >
                    <td className="w-[30%] px-4 py-4">{skills.skillsTitle}</td>
                    <td className="w-[50%] px-4 py-4">{skills.skillsDesc}</td>
                    <td className="w-[20%] px-4 py-4">
                      {skills.skillsDocURL ? (
                        <a href={skills.skillsDocURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Document</a>
                      ) : (
                        "No Document"
                      )}
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
                {employeeData.awards.map((awards, i) => (
                  <tr
                    className={`${i % 2 === 0 ? "bg-[#fefefe]" : "bg-gray-50"} px-4 py-2`}
                    key={i}
                  >
                    <td className="w-[30%] px-4 py-4">{awards.awardsTitle}</td>
                    <td className="w-[50%] px-4 py-4">{awards.awardsDesc}</td>
                    <td className="w-[20%] px-4 py-4">
                      {awards.awardsDocURL ? (
                        <a href={awards.awardsDocURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Document</a>
                      ) : (
                        "No Document"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-b border-gray-900/10 pb-12"></div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {adminEditProfile && (
                <Link to={`/info/editEmployeeProfile/${employeeData.id}`}>
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Profile
                  </button>
                </Link>
              )}
              {userEditProfile && (
                <Link to={`/info/editMyProfile/${employeeData.id}`}>
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit Profile
                  </button>
                </Link>
              )}
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
