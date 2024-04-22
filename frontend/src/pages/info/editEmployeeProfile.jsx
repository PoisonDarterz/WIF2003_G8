import { PhotoIcon } from '@heroicons/react/24/solid'
import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link } from "react-router-dom";

export default function EditEmployeeProfile() {
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
                    <img class="h-48 w-36 mr-4 rounded-lg" src="/Profile_image.jpg" alt="Profile Picture" />
                    <label htmlFor="profilePic" className="mt-2 cursor-pointer text-indigo-600">
                        <PhotoIcon className="h-5 w-5 inline-block mr-1" />
                        Change photo
                        <input type="file" id="profilePic" className="hidden" />
                    </label>
                    <label htmlFor="employeeId" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Employee ID
                    </label>
                    <input
                        id="employeeId"
                        name="employeeId"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="name" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <label htmlFor="joinDate" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Joined Since 
                    </label>
                    <input
                        id="joinDate"
                        name="joinDate"
                        type="date"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                {/* Middle Column */}
                <div className="sm:col-span-1 text-left p-5"> 
                    <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                        Department
                    </label>
                    <input
                        id="department"
                        name="department"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="jobTitle" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Job Title
                    </label>
                    <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <label htmlFor="email" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="phone" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="edu" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Education
                    </label>
                    <textarea
                        id="edu"
                        name="edu"
                        rows={4}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />
                </div>

                {/* Right Column */}
                <div className="sm:col-span-1 text-left p-5">  
                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />

                    <label htmlFor="skills" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Skills
                    </label>
                    <textarea
                        id="skills"
                        name="skills"
                        rows={5}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />

                    <label htmlFor="awards" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Professional Affiliations or Awards
                    </label>
                    <textarea
                        id="awards"
                        name="awards"
                        rows={4}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>  
  );
}
