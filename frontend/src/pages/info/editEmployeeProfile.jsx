import React, { useState, useEffect } from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function EditEmployeeProfile() {
  const {id} = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [profilePic, setProfilePic] = useState("/Profile_image.jpg");
  const [isLoading, setIsLoading] = useState(true);

  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Finance"]; 
  const jobTitles = ["Sales Manager", "Marketing Specialist", "Software Engineer", "HR Coordinator", "Financial Analyst"]; 

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        const data = await response.json();
        setEmployeeData(data);
        setDepartment(data.department || "");
        setJobTitle(data.jobTitle || "");
        setEducationList(data.educationList || []);
        setSkillsList(data.skillsList || []);
        setAwardsList(data.awardsList || []);
        setProfilePic(data.profilePic || "/Profile_image.jpg");
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
      setIsLoading(false);
    };

    fetchEmployeeData();
  }, [id]);
  
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
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
    setEducationList([...educationList, { title: "", description: "", evidence: "", confirmed: false }]);
  };

  const handleAddSkill = () => {
    setSkillsList([...skillsList, { skill: "", description: "", evidence: "", confirmed: false }]);
  };

  const handleAddAward = () => {
    setAwardsList([...awardsList, { award: "", description: "", evidence: "", confirmed: false }]);
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
          <h1 className="text-2xl font-bold">Edit Employee Profile</h1>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          {/* Left Column */}
          <div className="sm:col-span-1 text-left p-5">
            {/* Profile Picture */}
            <div className="flex items-center">
              <img className="h-48 w-36 mr-4 rounded-lg" src={profilePic} alt="Profile Picture" />
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
                defaultValue={employeeData.employeeId}
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
                defaultValue={employeeData.name}
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
                defaultValue={employeeData.email}
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
                defaultValue={employeeData.phone}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {/* Dropdown for department */}
            <div>
            <label htmlFor="department" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Department
            </label>
            <select
                id="department"
                name="department"
                value={department}
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

            {/* Dropdown for job title */}
            <div>
            <label htmlFor="jobTitle" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Job Title
            </label>
            <select
                id="jobTitle"
                name="jobTitle"
                value={jobTitle}
                onChange={handleJobTitleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
                <option value="">Select Job Title</option>
                {jobTitles.map((title) => (
                <option key={title} value={title}>
                    {title}
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
                defaultValue={employeeData.joinedSince}
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
                defaultValue={employeeData.bio}
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
                        <h4 className="text-sm font-semibold">{education.title}</h4>
                        <p>{education.description}</p>
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
                        value={education.title}
                        onChange={(e) => handleChange(e, index, educationList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={education.description}
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
                        <h4 className="text-sm font-semibold">{skill.skill}</h4>
                        <p>{skill.description}</p>
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
                        value={skill.skill}
                        onChange={(e) => handleChange(e, index, skillsList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={skill.description}
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
                        <h4 className="text-sm font-semibold">{award.award}</h4>
                        <p>{award.description}</p>
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
                        value={award.award}
                        onChange={(e) => handleChange(e, index, awardsList)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={award.description}
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
