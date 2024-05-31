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
  const [profilePic, setProfilePic] = useState("/Profile_image.jpg");
  const [isLoading, setIsLoading] = useState(true);

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
      const uniqueDepartments = new Set();
      const uniqueJobTitles = new Set();
  
      allEmployeeData.forEach((employee) => {
        uniqueDepartments.add(employee.roleId.departmentId.departmentName);
        uniqueJobTitles.add(employee.roleId.roleName);
      });
  
      setDepartments(Array.from(uniqueDepartments));
      setJobTitles(Array.from(uniqueJobTitles));
    }
  }, [allEmployeeData]);

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployeeData = {
        ...employeeData,
        joinedSince: new Date(employeeData.joinedSince).toISOString(),
        
      };
      const response = await axios.put(`http://localhost:5000/api/employees/${id}`, updatedEmployeeData);
      console.log("Profile updated successfully", response.data);
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

  const handleFileChange = (e) => {
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
    setEducationList([...educationList, { eduTitle: "", eduDesc: "", eduDocURL: "", confirmed: false }]);
  };

  const handleAddSkill = () => {
    setSkillsList([...skillsList, { skillsTitle: "", skillsDesc: "", skillsDocURL: "", confirmed: false }]);
  };

  const handleAddAward = () => {
    setAwardsList([...awardsList, { awardsTitle: "", awardsDesc: "", awardsDocURL: "", confirmed: false }]);
  };

  const handleConfirmItem = (index, listType) => {
    const updatedList = [...listType];
    updatedList[index].confirmed = true;
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
  };

  const handleDeleteItem = (index, listType) => {
    const updatedList = [...listType];
    updatedList.splice(index, 1);
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
  };

  const handleCancelEditSection = (index, listType) =>{

  };

  const handleChange = (e, index, listType) => {
    const { name, value } = e.target;
    const updatedList = [...listType];
    updatedList[index][name] = value;
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
  };

  // Inside handleDepartmentChange function
  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setEmployeeData(prevState => ({
      ...prevState,
      roleId: {
        ...prevState.roleId,
        departmentId: {
          ...prevState.roleId.departmentId,
          departmentName: selectedDepartment
        }
      }
    }));
  };

  // Inside handleJobTitleChange function
  const handleJobTitleChange = (e) => {
    const selectedJobTitle = e.target.value;
    setEmployeeData(prevState => ({
      ...prevState,
      roleId: {
        ...prevState.roleId,
        roleName: selectedJobTitle
      }
    }));
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
              <img className="h-48 w-36 mr-4 rounded-lg" src={profilePic} alt="Profile Picture" />
              <label htmlFor="profilePic" className="text-black">
                Change Photo
                {/* <input type="file" id="profilePic" onChange={handleFileChange}/> */}
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
              value={employeeData.roleId.departmentId.departmentName}
              onChange={handleDepartmentChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
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
              value={employeeData.roleId.roleName}
              onChange={handleJobTitleChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Job Title</option>
              {jobTitles.map((role) => (
                <option key={role} value={role}>
                  {role}
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
                value={
                  employeeData.joinedSince
                    ? new Date(employeeData.joinedSince)
                        .toISOString()
                        .substring(0, 10)
                    : ""
                }
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
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Education and Experiences</label>
              {educationList.map((education, index) => (
                <div key={index} className="mt-2">
                  {education.confirmed ? (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <div>
                        <h4 className="text-sm font-semibold">{education.eduTitle}</h4>
                        <p>{education.eduDesc}</p>
                      </div>
                      <div className="flex gap-2">
                        {/* <button type="button" onClick={() => handleModifyItem(index, educationList)} className="text-indigo-600"><AiOutlineEdit /></button> */}
                        <button type="button" className="text-indigo-600"><AiOutlineEdit /></button>
                        <button type="button" onClick={() => handleDeleteItem(index, educationList)} className="text-red-500"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 bg-[#eaf3ff] p-4 rounded-lg">
                      <input
                        type="text"
                        name="title"
                        placeholder="Education and Experiences"
                        value={education.eduTitle}
                        onChange={(e) => handleChange(e, index, educationList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={education.eduDesc}
                        onChange={(e) => handleChange(e, index, educationList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`evidence${index}`}
                        name={`evidence${index}`}
                      />
                      <div className="flex justify-center gap-10 items-center">
                        <button type="button" onClick={() => handleConfirmItem(index, educationList)} className="text-indigo-600">Add</button>
                        <button type="button" onClick={() => handleCancelEditSection(index, educationList)} className="text-red-500">Cancel</button>
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
                + Add Education and Experiences
              </button>
            </div>
            <div className="border-b border-gray-900/10 pb-12"></div>

            {/* Skills Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Skills</label>
              {skillsList.map((skill, index) => (
                <div key={index} className="mt-2">
                  {skill.confirmed ? (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <div>
                        <h4 className="text-sm font-semibold">{skill.skillsTitle}</h4>
                        <p>{skill.skillsDesc}</p>
                      </div>
                      <div className="flex gap-2">
                        {/* <button type="button" onClick={() => handleModifyItem(index, skillsList)} className="text-indigo-600"><AiOutlineEdit /></button> */}
                        <button type="button" className="text-indigo-600"><AiOutlineEdit /></button>
                        <button type="button" onClick={() => handleDeleteItem(index, skillsList)} className="text-red-500"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 bg-[#eaf3ff] p-4 rounded-lg">
                      <input
                        type="text"
                        name="skill"
                        placeholder="Skill"
                        value={skill.skillsTitle}
                        onChange={(e) => handleChange(e, index, skillsList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={skill.skillsDesc}
                        onChange={(e) => handleChange(e, index, skillsList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`skillEvidence${index}`}
                        name={`skillEvidence${index}`}
                      />
                      <div className="flex justify-center gap-10 items-center">
                        <button type="button" onClick={() => handleConfirmItem(index, skillsList)} className="text-indigo-600">Add</button>
                        <button type="button" onClick={() => handleCancelEditSection(index, skillsList)} className="text-red-500">Cancel</button>
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
                + Add Skill
              </button>
            </div>
            <div className="border-b border-gray-900/10 pb-12"></div>

            {/* Awards Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Professional Affiliations or Awards</label>
              {awardsList.map((award, index) => (
                <div key={index} className="mt-2">
                  {award.confirmed ? (
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <div>
                        <h4 className="text-sm font-semibold">{award.awardsTitle}</h4>
                        <p>{award.awardsDesc}</p>
                      </div>
                      <div className="flex gap-2">
                        {/* <button type="button" onClick={() => handleModifyItem(index, awardsList)} className="text-indigo-600"><AiOutlineEdit /></button> */}
                        <button type="button" className="text-indigo-600"><AiOutlineEdit /></button>
                        <button type="button" onClick={() => handleDeleteItem(index, awardsList)} className="text-red-500"><AiOutlineDelete /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 bg-[#eaf3ff] p-4 rounded-lg">
                      <input
                        type="text"
                        name="award"
                        placeholder="Professional Affiliation or Award"
                        value={award.awardsTitle}
                        onChange={(e) => handleChange(e, index, awardsList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={award.awardsDesc}
                        onChange={(e) => handleChange(e, index, awardsList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`awardEvidence${index}`}
                        name={`awardEvidence${index}`}
                      />
                      <div className="flex justify-center gap-10 items-center">
                        <button type="button" onClick={() => handleConfirmItem(index, awardsList)} className="text-indigo-600">Add</button>
                        <button type="button" onClick={() => handleCancelEditSection(index, awardsList)} className="text-red-500">Cancel</button>
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
                + Add Affiliation or Award
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
