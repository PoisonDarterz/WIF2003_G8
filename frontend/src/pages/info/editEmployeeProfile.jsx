import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function EditEmployeeProfile() {
  const navigate = useNavigate();
  const {id} = useParams();  
  const [employeeData, setEmployeeData] = useState({
    id: "",
    profilePicURL: "",
    name: "", 
    email: { email: "" }, 
    phone: "", 
    roleId: { departmentId: { departmentName: "" }, roleName: "" }, 
    joinedSince: "",
    bio: "", 
    edu: [],
    skills: [],
    awards: [],
    emailContact: "",
  });  
  const [allEmployeeData, setAllEmployeeData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);  
        // Fetch employee data
        const allEmployeeResponse = await axios.get(`http://localhost:5000/api/employees`);
        const employeeResponse = await axios.get(`http://localhost:5000/api/employees/${id}`);
        
        const employee = employeeResponse.data;
        if (!employee.emailContact) {
          employee.emailContact = employee.email.email;
        }

        setEmployeeData(employee);
        setAllEmployeeData(allEmployeeResponse.data);
        const eduData = employee.edu.map(edu => ({ ...edu, confirmed: true }));
        const skillsData = employee.skills.map(skill => ({ ...skill, confirmed: true }));
        const awardsData = employee.awards.map(award => ({ ...award, confirmed: true }));

        setEducationList(eduData);
        setSkillsList(skillsData);
        setAwardsList(awardsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  
  useEffect(() => {
    // Extract unique department names and job titles
    if (allEmployeeData) {
      const uniqueDepartments = [];
      const uniqueJobTitles = [];
  
      allEmployeeData.forEach((employee) => {
        // Check if the department is already in the array
        const departmentExists = uniqueDepartments.find(department => department._id === employee.roleId.departmentId._id);
        if (!departmentExists) {
          uniqueDepartments.push(employee.roleId.departmentId);
        }
  
        // Check if the job title is already in the array
        const jobTitleExists = uniqueJobTitles.find(role => role._id === employee.roleId._id);
        if (!jobTitleExists) {
          uniqueJobTitles.push(employee.roleId);
        }
      });
  
      setDepartments(uniqueDepartments);
      setJobTitles(uniqueJobTitles);
    }
  }, [allEmployeeData]);
  

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      // Upload file to server
      // const formData = new FormData();
      // formData.append("file", profilePic);

      // const response = await axios.post(`http://localhost:5000/api/employees/${id}`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // });
      // console.log("File uploaded successfully", response.data);
  
      const updatedEmployeeData = {
        ...employeeData,
        joinedSince: new Date(employeeData.joinedSince).toISOString(),
        edu: educationList.filter(edu => edu.confirmed),
        skills: skillsList.filter(skill => skill.confirmed),
        awards: awardsList.filter(award => award.confirmed),
        // profilePicURL: response.data.profilePicURL // Use the new profile pic URL
      };
  
      const updateResponse = await axios.put(`http://localhost:5000/api/employees/${id}`, updatedEmployeeData);
      console.log("Profile updated successfully", updateResponse.data);
      navigate(`/info/viewProfile/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value !== null) { 
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEducation = () => {
    setEducationList([...educationList, { eduTitle: '', eduDesc: '', eduDocURL: '', confirmed: false }]);
    setEditIndex(educationList.length);
    setEditType("edu");
  };

  const handleAddSkill = () => {
    setSkillsList([...skillsList, { skillsTitle: "", skillsDesc: "", skillsDocURL: "", confirmed: false }]);
    setEditIndex(skillsList.length);
    setEditType("skills");
  };

  const handleAddAward = () => {
    setAwardsList([...awardsList, { awardsTitle: "", awardsDesc: "", awardsDocURL: "", confirmed: false }]);
    setEditIndex(awardsList.length);
    setEditType("awards");
  };

  const handleEditItem = (index, listType) => {
    const itemToEdit = listType[index];
    setEditIndex(index);
    setEditType(listType);
  };
  

  const handleConfirmItem = (index, listType) => {
    const updatedList = [...listType];
    updatedList[index].confirmed = true;
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
    setEditIndex(null);
    setEditType("");
  };

  const handleDeleteItem = (index, listType) => {
    const updatedList = [...listType];
    updatedList.splice(index, 1);
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
  };

  // const handleCancelEditSection = () =>{
  //   setEditIndex(null);
  //   setEditType("");
  // };  

  const handleChange = (e, index, listType) => {
    const { name, value } = e.target;
    const updatedList = [...listType];
    updatedList[index][name] = value;
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    const selectedDepartment = departments.find(department => department._id === selectedDepartmentId);

    if (selectedDepartment) {
        setEmployeeData(prevState => ({
            ...prevState,
            roleId: {
                ...prevState.roleId,
                departmentId: selectedDepartment
            }
        }));
        }
    };

    const handleJobTitleChange = (e) => {
        const selectedJobTitleId = e.target.value;
        const selectedJobTitle = jobTitles.find(jobTitle => jobTitle._id === selectedJobTitleId);

        if (selectedJobTitle) {
            setEmployeeData(prevState => ({
                ...prevState,
                roleId: selectedJobTitle
            }));
        }
    };


  if (isLoading) { 
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={saveProfile}>
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          {/* Left Column */}
          <div className="sm:col-span-1 text-left p-5">
            {/* Profile Picture */}
            <div className="flex items-center">
            <img className="h-48 w-36 mr-4 rounded-lg" src={profilePic || employeeData.profilePicURL || "/Profile_image.jpg"} alt="Profile Picture" />
              <label htmlFor="profilePic" className="text-black">
                Change Photo
                <input type="file" id="profilePic" onChange={handleFileChange}/>
              </label>
            </div>
            {/* Input for employee ID */}
            <label htmlFor="employeeId" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Employee ID
            </label>
            <input
                id="employeeId"
                name="employeeId"
                type="text"
                value={employeeData.id}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {/* Input for name */}
            <label htmlFor="name" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Name
            </label>
            <input
                id="name"
                name="name"
                type="text"
                value={employeeData.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {/* Input for email */}
            <label htmlFor="email" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Email Address
            </label>
            <input
                id="email"
                name="email"
                type="email"
                value={employeeData.emailContact}
                onChange={handleInputChange}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />


            {/* Input for phone */}
            <label htmlFor="phone" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Phone Number
            </label>
            <input
                id="phone"
                name="phone"
                type="phone"
                value={employeeData.phone}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        {/* Department dropdown */}
        <div>
            <label htmlFor="department" className="mt-5 block text-md font-medium leading-6 text-gray-900">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={employeeData.roleId.departmentId._id}
              onChange={handleDepartmentChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Job title dropdown */}
          <div>
            <label htmlFor="jobTitle" className="mt-5 block text-md font-medium leading-6 text-gray-900">
              Job Title
            </label>
            <select
              id="jobTitle"
              name="jobTitle"
              value={employeeData.roleId._id}
              onChange={handleJobTitleChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Job Title</option>
              {jobTitles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>

          {/* Input for join date */}
            <label htmlFor="joinDate" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Joined Since
            </label>
            <input
                id="joinDate"
                name="joinDate"
                type="date"
                value={employeeData.joinedSince.split("T")[0]}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Right Column */}
          <div className="sm:col-span-2 text-left p-5">
            {/* Textarea for bio */}
            <label htmlFor="bio" className="block text-md font-medium leading-6 text-gray-900">
                Bio
            </label>
            <textarea
                id="bio"
                name="bio"
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={employeeData.bio}
                onChange={handleInputChange}
            />
            <div className="border-b border-gray-900/10 pb-12"></div>

           {/* Education Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Education</label>
              {educationList.map((edu, index) => (
                <div key={index} className="mt-2">
                  {editIndex === index && editType === "edu" ? (
                    <div className="flex flex-col gap-4 bg-[#eaf3ff] p-4 rounded-lg">
                      <input
                        type="text"
                        name="eduTitle"
                        value={edu.eduTitle}
                        onChange={(e) => handleChange(e, index, educationList)}
                        placeholder="Title"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="eduDesc"
                        value={edu.eduDesc}
                        onChange={(e) => handleChange(e, index, educationList)}
                        placeholder="Description"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`eduEvidence${index}`}
                        name={`eduEvidence${index}`}
                      />
                      <div className="flex justify-center gap-10 items-center">
                        <button type="button" onClick={() => handleConfirmItem(index, educationList)} className="text-indigo-600">Confirm</button>
                        {/* <button type="button" onClick={handleCancelEditSection} className="text-red-500">Cancel</button> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                      <div>
                        <h4 className="text-sm font-semibold">{edu.eduTitle}</h4>
                        <p>{edu.eduDesc}</p>
                        <p className="text-blue-500">{edu.eduDocURL}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => handleEditItem(index, "edu")} className="text-indigo-600"><AiOutlineEdit /></button>
                        <button type="button" onClick={() => handleDeleteItem(index, educationList)} className="text-red-500"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + Add Education & Experiences
              </button>
            </div>
            <div className="border-b border-gray-900/10 pb-12"></div>


            {/* Skills Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Skills</label>
              {skillsList.map((skills, index) => (
                <div key={index} className="mt-2">
                  {editIndex === index && editType === "skills" ? (
                    <div className="flex flex-col gap-4 bg-[#eaf3ff] p-4 rounded-lg">
                      <input
                        type="text"
                        name="skillsTitle"
                        value={skills.skillsTitle}
                        onChange={(e) => handleChange(e, index, skillsList)}
                        placeholder="Title"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="skillsDesc"
                        value={skills.skillsDesc}
                        onChange={(e) => handleChange(e, index, skillsList)}
                        placeholder="Description"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`skillsEvidence${index}`}
                        name={`skillsEvidence${index}`}
                      />
                      <div className="flex justify-center gap-10 items-center">
                        <button type="button" onClick={() => handleConfirmItem(index, skillsList)} className="text-indigo-600">Confirm</button>
                        {/* <button type="button" onClick={handleCancelEditSection} className="text-red-500">Cancel</button> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                      <div>
                        <h4 className="text-sm font-semibold">{skills.skillsTitle}</h4>
                        <p>{skills.skillsDesc}</p>
                        <p className="text-blue-500">{skills.skillsDocURL}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => handleEditItem(index, "skills")} className="text-indigo-600"><AiOutlineEdit /></button>
                        <button type="button" onClick={() => handleDeleteItem(index, skillsList)} className="text-red-500"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSkill}
                className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + Add Skills
              </button>
            </div>
            <div className="border-b border-gray-900/10 pb-12"></div>

            {/* Awards Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Awards</label>
              {awardsList.map((awards, index) => (
                <div key={index} className="mt-2">
                  {editIndex === index && editType === "awards" ? (
                    <div className="flex flex-col gap-4 bg-[#eaf3ff] p-4 rounded-lg">
                      <input
                        type="text"
                        name="awardsTitle"
                        value={awards.awardsTitle}
                        onChange={(e) => handleChange(e, index, awardsList)}
                        placeholder="Title"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="awardsDesc"
                        value={awards.awardsDesc}
                        onChange={(e) => handleChange(e, index, awardsList)}
                        placeholder="Description"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`awardsDocURL${index}`}
                        name={`awardsDocURL${index}`}
                      />
                      <div className="flex justify-center gap-10 items-center">
                        <button type="button" onClick={() => handleConfirmItem(index, awardsList)} className="text-indigo-600">Confirm</button>
                        {/* <button type="button" onClick={handleCancelEditSection} className="text-red-500">Cancel</button> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                      <div>
                        <h4 className="text-sm font-semibold">{awards.awardsTitle}</h4>
                        <p>{awards.awardsDesc}</p>
                        <p className="text-blue-500">{awards.awardsDocURL}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => handleEditItem(index, "awards")} className="text-indigo-600"><AiOutlineEdit /></button>
                        <button type="button" onClick={() => handleDeleteItem(index, awardsList)} className="text-red-500"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAward}
                className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + Add Awards
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12"></div> 

        {/* Button to save profile */}
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Profile
          </button>
          <button
            type="button"
            className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}