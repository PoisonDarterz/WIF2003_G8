import { PhotoIcon } from '@heroicons/react/24/solid'
import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link } from "react-router-dom";

export default function EditMyProfile() {
  return (
    <form>
        <div className="p-8">
            <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
                <TopNavBlack />
            </div>
            <div className="mt-8 mb-4 text-left">
                <h1 className="text-2xl font-bold">Edit My Profile</h1>
            </div>
            
            <div class="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-x-4">
                
                {/* Left Column */}
                <div class="sm:col-span-1 text-left p-5"> 
                    <img class="h-48 w-36 mr-4 rounded-lg" src="/Profile_image.jpg" alt="Profile Picture" />
                    <label htmlFor="profilePic" className="mt-2 cursor-pointer text-indigo-600">
                        <PhotoIcon className="h-5 w-5 inline-block mr-1" />
                        Change photo
                        <input type="file" id="profilePic" className="hidden" />
                    </label>
                    <div class="mt-5">
                        <h2 className="font-bold">Employee ID</h2>
                        <p>#E00318</p>
                        <h2 className='mt-5 font-bold'>Name</h2>
                        <p>John Smith</p>
                    </div>
                </div>

                {/* Middle Column */}
                <div class="sm:col-span-2 text-left p-5">  
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email Address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <label htmlFor="phone" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                    </label>
                    <div className="mt-2">
                    <input
                        id="phone"
                        name="phone"
                        type="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <label htmlFor="edu" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                     Education
                    </label>
                    <div className="mt-2">
                    <textarea
                        id="edu"
                        name="edu"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div class="sm:col-span-2 text-left p-5">  
                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                     Bio
                    </label>
                    <div className="mt-2">
                    <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />
                    </div>

                    <label htmlFor="skills" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                     Skills
                    </label>
                    <div className="mt-2">
                    <textarea
                        id="skills"
                        name="skills"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />
                    </div>

                    <label htmlFor="awards" className="mt-5 block text-sm font-medium leading-6 text-gray-900">
                    Professional Affiliations or Awards
                    </label>
                    <div className="mt-2">
                    <textarea
                        id="awards"
                        name="awards"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                    />
                    </div>

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
  )
}
