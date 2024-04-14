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
                    <div className="flex justify-center items-center mb-8">
                        <img src="/Profile_image.jpg" alt="Profile" className="h-24 w-24 rounded-full border-2 border-white" />
                    </div>
                    <div className="text-left">
                        <div className="mb-6">
                            <p className="font-bold text-lg">First Name: <span className="font-normal text-lg">John</span></p>
                            <p className="font-bold text-lg">Last Name: <span className="font-normal text-lg">Doe</span></p>
                            <p className="font-bold text-lg">Employee ID: <span className="font-normal text-lg">EMP123</span></p>
                            <p className="font-bold text-lg">Email: <span className="font-normal text-lg">john.doe@example.com</span></p>
                            <p className="font-bold text-lg">Contact: <span className="font-normal text-lg">+1234567890</span></p>
                            <p className="font-bold text-lg">Department: <span className="font-normal text-lg">HR</span></p>
                            <p className="font-bold text-lg">Position: <span className="font-normal text-lg">Manager</span></p>
                        </div>
                        <div className="flex justify-center mt-8"> 
                            <Link to="/general/LogIn">
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Log Out</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
