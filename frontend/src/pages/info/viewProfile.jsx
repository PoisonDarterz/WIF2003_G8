import React from "react";
import TopNavBlack from "../../components/TopNavBlack";
import { Link } from "react-router-dom";

export default function ViewProfile() {
  return (
    <form>
        <div className="p-8">
            <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
                <TopNavBlack />
            </div>
            <div className="mt-8 mb-4 text-left">
                <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            
            <div class="mt-10 grid grid-cols-1 sm:grid-cols-10 gap-x-4">
                {/* Left Column */}
                <div class="bg-[#eaf3ff] p-5 sm:col-span-2 text-left rounded-lg"> 
                    <div>
                        <img class="h-48 w-36 rounded-lg" src="/Profile_image.jpg" alt="Profile Picture" />
                        <h2 className="mt-5 font-bold">Employee ID</h2>
                        <p>#E00318</p>

                        <h2 className='mt-5 font-bold'>Name</h2>
                        <p>John Smith</p>

                        <h2 className='mt-5 font-bold'>Contact</h2>
                        <p>john.smith@gmail.com <br/>
                            +60 19 442 2659
                        </p>

                        <h2 className='mt-5 font-bold'>Department</h2>
                        <p>Sales</p>

                        <h2 className='mt-5 font-bold'>Job Title</h2>
                        <p>Sales Manager</p>

                        <h2 className='mt-5 font-bold'>Education</h2>
                        <p>University Malaya, <br /> Bachelor of Finance
                        </p>

                        <h2 className='mt-5 font-bold'>Joined Since</h2>
                        <p>26 January 2015</p>
                    </div>
                </div>

                {/* Right Column */}
                <div class="sm:col-span-8 text-left ml-5">  
                    <h2 className='font-bold'>Bio</h2>
                    <p>
                        I am an experienced Sales Manager with a strong track record in driving revenue growth and exceeding sales targets. With over a decade of experience in the sales industry, I have developed a deep understanding of market dynamics and customer needs. My role involves leading a team of sales professionals, developing strategic sales plans, and fostering strong relationships with clients. I thrive in fast-paced environments and am passionate about delivering exceptional results.
                    </p>
                    <div className="border-b border-gray-900/10 pb-12"></div>

                    <h2 className='mt-5 font-bold'>Skills</h2>
                    <p>
                        As a Sales Manager, I possess a diverse range of skills essential for driving sales success. These include:
                            <li>Strategic Planning: I have a proven ability to develop and implement effective sales strategies tailored to meet business objectives and market demands.</li>
                            <li>Leadership: I excel in leading and motivating teams to achieve outstanding results, fostering a collaborative and high-performance culture.</li>
                            <li>Relationship Building: My strong interpersonal skills allow me to build and maintain long-term relationships with clients, resulting in repeat business and customer loyalty.</li>
                            <li>Negotiation: I am adept at negotiating favorable terms and closing deals, ensuring mutually beneficial outcomes for both the company and the client.</li>
                            <li>Market Analysis: I have a keen eye for market trends and competitor activities, enabling me to identify opportunities for growth and stay ahead of the competition.</li>
                    </p>

                    <div className="border-b border-gray-900/10 pb-12"></div>

                    <h2 className='mt-5 font-bold'>Professional Affiliations or Awards</h2>
                    <p>
                    Throughout my career, I have been honored to receive recognition for my contributions to the sales industry. Some of my notable affiliations and awards include:
                    <li>Sales Excellence Award: Recognized for consistently exceeding sales targets and demonstrating outstanding performance in driving revenue growth.</li>
                    <li>Member of Sales Management Association: I am an active member of the Sales Management Association, where I contribute insights and best practices to the sales community.</li>
                    <li>Speaker at Industry Conferences: I have been invited to speak at several industry conferences and events, sharing my expertise on sales strategy and leadership.</li>
                    <li>Certified Sales Professional: I hold certifications in sales management and leadership, demonstrating my commitment to continuous professional development and excellence in the field.</li>
                    </p>
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
    </form>   
  )
}
