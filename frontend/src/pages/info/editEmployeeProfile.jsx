import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";

export default function EditEmployeeProfile() {
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [profilePic, setProfilePic] = useState("/Profile_image.jpg");

  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Finance"]; // Example department options
  const jobTitles = ["Sales Manager", "Marketing Specialist", "Software Engineer", "HR Coordinator", "Financial Analyst"]; // Example job title options

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
    setEducationList([...educationList, { title: "", evidence: "", confirmed: false }]);
  };

  const handleAddSkill = () => {
    setSkillsList([...skillsList, { skill: "", evidence: "", confirmed: false }]);
  };

  const handleAddAward = () => {
    setAwardsList([...awardsList, { award: "", evidence: "", confirmed: false }]);
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducationList = [...educationList];
    updatedEducationList[index][name] = value;
    setEducationList(updatedEducationList);
  };

  const handleSkillChange = (e, index) => {
    const updatedSkillsList = [...skillsList];
    updatedSkillsList[index][e.target.name] = e.target.value;
    setSkillsList(updatedSkillsList);
  };

  const handleAwardChange = (e, index) => {
    const updatedAwardsList = [...awardsList];
    updatedAwardsList[index][e.target.name] = e.target.value;
    setAwardsList(updatedAwardsList);
  };

  const handleConfirmEducation = (index) => {
    const updatedEducationList = [...educationList];
    updatedEducationList[index].confirmed = true;
    setEducationList(updatedEducationList);
  };

  const handleConfirmSkill = (index) => {
    const updatedSkillsList = [...skillsList];
    updatedSkillsList[index].confirmed = true;
    setSkillsList(updatedSkillsList);
  };

  const handleConfirmAward = (index) => {
    const updatedAwardsList = [...awardsList];
    updatedAwardsList[index].confirmed = true;
    setAwardsList(updatedAwardsList);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkillsList = [...skillsList];
    updatedSkillsList.splice(index, 1);
    setSkillsList(updatedSkillsList);
  };

  const handleDeleteAward = (index) => {
    const updatedAwardsList = [...awardsList];
    updatedAwardsList.splice(index, 1);
    setAwardsList(updatedAwardsList);
  };

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
                defaultValue={''}
            />

            {/* Education Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Education</label>
              {educationList.map((education, index) => (
                <div key={index} className="mt-2 flex items-center gap-4">
                  {education.confirmed ? (
                    <React.Fragment>
                      <span>{education.title}</span>
                      <button type="button" onClick={() => handleDeleteEducation(index)} className="text-indigo-600">✖</button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <input
                        type="text"
                        name="title"
                        placeholder="Education Title"
                        value={education.title}
                        onChange={(e) => handleEducationChange(e, index)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`evidence${index}`}
                        name={`evidence${index}`}
                      />
                      <button type="button" onClick={() => handleConfirmEducation(index)} className="text-indigo-600">Confirm</button>
                    </React.Fragment>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                className="text-indigo-600"
              >
                + Add Education
              </button>
            </div>

            {/* Skills Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Skills</label>
              {skillsList.map((skill, index) => (
                <div key={index} className="mt-2 flex items-center gap-4">
                  {skill.confirmed ? (
                    <React.Fragment>
                      <span>{skill.skill}</span>
                      <button type="button" onClick={() => handleDeleteSkill(index)} className="text-indigo-600">✖</button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <input
                        type="text"
                        name="skill"
                        placeholder="Skill"
                        value={skill.skill}
                        onChange={(e) => handleSkillChange(e, index)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`skillEvidence${index}`}
                        name={`skillEvidence${index}`}
                      />
                      <button type="button" onClick={() => handleConfirmSkill(index)} className="text-indigo-600">Confirm</button>
                    </React.Fragment>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSkill}
                className="text-indigo-600"
              >
                + Add Skill
              </button>
            </div>

            {/* Awards Section */}
            <div>
              <label className="mt-5 block text-md font-medium leading-6 text-gray-900">Professional Affiliations or Awards</label>
              {awardsList.map((award, index) => (
                <div key={index} className="mt-2 flex items-center gap-4">
                  {award.confirmed ? (
                    <React.Fragment>
                      <span>{award.award}</span>
                      <button type="button" onClick={() => handleDeleteAward(index)} className="text-indigo-600">✖</button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <input
                        type="text"
                        name="award"
                        placeholder="Professional Affiliation or Award"
                        value={award.award}
                        onChange={(e) => handleAwardChange(e, index)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        id={`awardEvidence${index}`}
                        name={`awardEvidence${index}`}
                      />
                      <button type="button" onClick={() => handleConfirmAward(index)} className="text-indigo-600">Confirm</button>
                    </React.Fragment>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAward}
                className="text-indigo-600"
              >
                + Add Affiliation or Award
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-6"></div>
        {/* Button to save profile */}
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Profile
          </button>
        </div>
      </div>
    </form>
  );
}
