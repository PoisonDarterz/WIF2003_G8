import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBlack from "../../components/TopNavBlack";

const Profile = () => {
    const backgroundImage = process.env.PUBLIC_URL + '/Home.png';  // Path to the background image

    return (
        <div className="relative">
            <TopNavBlack />
            <div className="absolute top-0 left-0 w-full h-full bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            
            <div className="container mx-auto h-screen flex flex-col justify-center items-center text-black relative z-10">
                <div className="bg-opacity-80 bg-white p-8 rounded-lg w-1/3"> 
                    <div className="flex justify-center items-center mb-5">
                        <img src="/Profile_image.jpg" alt="Profile" className="h-32 w-32 rounded-full border-2 border-white" />
                    </div>
                    <div className="text-center">
                        <div className="mb-5">
                            <p className="font-bold text-lg">John Smith</p>
                            <p className="font-bold text-lg">#E00318</p>
                        </div>
                        <div className="border-b border-black pb-5"></div>
                        <div className="flex justify-center"> 
                            <Link to="/info/viewProfile" className="mt-5 text-indigo-600 font-semibold hover:underline">View Profile</Link>
                        </div>
                        <div className="border-b border-black pb-5"></div>
                        <div className="flex justify-center"> 
                            <Link to="/info/editMyProfile" className="mt-5 text-indigo-600 font-semibold hover:underline">Edit Profile</Link>
                        </div>
                        <div className="border-b border-black pb-5"></div>
                        <div className="flex justify-center"> 
                            <Link to="/general/LogIn" className="mt-5 text-red-500 font-semibold hover:underline">Log Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
