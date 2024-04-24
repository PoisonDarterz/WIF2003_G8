import React, { useState } from "react";
import TopNavBlack from "../../components/TopNavBlack";

export default function EditMyProfile() {
  const [educationList, setEducationList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [profilePic, setProfilePic] = useState("/Profile_image.jpg");

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

  const handleChange = (e, index, listType) => {
    const { name, value } = e.target;
    const updatedList = [...listType];
    updatedList[index][name] = value;
    listType === educationList ? setEducationList(updatedList) :
    listType === skillsList ? setSkillsList(updatedList) : setAwardsList(updatedList);
  };

  return (
    <form>
      <div className="p-8">
        <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
          <TopNavBlack />
        </div>
        <div className="mt-8 mb-4 text-left">
          <h1 className="text-2xl font-bold">Edit My Profile</h1>
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

            <label htmlFor="employeeId" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Employee ID
            </label>
            <p>#E00318</p>

            <h4 className="mt-5">Name</h4>
            <p>John Smith</p>

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

            <label htmlFor="phone" className="mt-5 block text-md font-medium leading-6 text-gray-900">
                Phone Number
            </label>
            <input
                id="phone"
                name="phone"
                type="phone"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <h4 className="mt-5">Department</h4>
            <p>Sales</p> 

            <h4 className="mt-5">Job Title</h4>
            <p>Sales Manager</p>  

            <h4 className="mt-5">Joined Since</h4>
            <p>26 January 2015</p>
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
                      <button type="button" onClick={() => handleDeleteItem(index, educationList)} className="text-indigo-600">Delete</button>
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
                      <button type="button" onClick={() => handleConfirmItem(index, educationList)} className="text-indigo-600">Add</button>
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
                      <button type="button" onClick={() => handleDeleteItem(index, skillsList)} className="text-indigo-600">Delete</button>
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
                      <button type="button" onClick={() => handleConfirmItem(index, skillsList)} className="text-indigo-600">Add</button>
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
                      <button type="button" onClick={() => handleDeleteItem(index, awardsList)} className="text-indigo-600">Delete</button>
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
                      <button type="button" onClick={() => handleConfirmItem(index, awardsList)} className="text-indigo-600">Add</button>
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
