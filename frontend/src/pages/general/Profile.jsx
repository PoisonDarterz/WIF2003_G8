import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopNavBlack from "../../components/TopNavBlack";
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    const backgroundImage = process.env.PUBLIC_URL + '/Home.png';

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log('Fetching user profile...');
                const response = await axios.get("http://localhost:5000/api/auth/my-profile", {
                    withCredentials: true
                });

                const formattedData = {
                    id: `${response.data.id}`,
                    name: response.data.name,
                    profilePicURL: response.data.profilePicURL
                };

                console.log('User profile data received:', formattedData);
                setUser(formattedData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                if (error.response && error.response.status === 404) {
                    setError('User profile not found in the database.');
                } else {
                    setError('Failed to fetch user profile.');
                }
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed. Please try again.');
        }
    };

    return (
        <div className="relative">
            <TopNavBlack />
            <div className="absolute top-0 left-0 w-full h-full bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            
            <div className="container mx-auto h-screen flex flex-col justify-center items-center text-black relative z-10">
                <div className="bg-opacity-80 bg-white p-8 rounded-lg w-1/3"> 
                    <div className="flex justify-center items-center mb-5">
                        <img src={user.profilePicURL || '/Profile_image.jpg'} alt="Profile" className="h-32 w-32 rounded-full border-2 border-white" />
                    </div>
                    <div className="text-center">
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mb-5">
                            <p className="font-bold text-lg">{user.name}</p>
                            <p className="font-bold text-lg">{user.id}</p>
                        </div>
                        <div className="border-b border-black pb-5"></div>
                        <div className="flex justify-center"> 
                            <Link to={`/info/viewProfile/${user.id}`} className="mt-5 text-indigo-600 font-semibold hover:underline">View Profile</Link>
                        </div>
                        <div className="border-b border-black pb-5"></div>
                        <div className="flex justify-center"> 
                            <Link to={`/info/editMyProfile/${user.id}`} className="mt-5 text-indigo-600 font-semibold hover:underline">Edit Profile</Link>
                        </div>
                        <div className="border-b border-black pb-5"></div>
                        <div className="flex justify-center"> 
                            <button onClick={handleLogout} className="mt-5 text-red-500 font-semibold hover:underline">Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
