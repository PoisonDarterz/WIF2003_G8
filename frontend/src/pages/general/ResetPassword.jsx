import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const outerBgColor = 'bg-teal-200'; // Background color for the outer div
    const innerBgColor = 'bg-gray-100'; // Background color for the inner rectangle
    const navigate = useNavigate();
    const { token } = useParams(); // Extract token from URL

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');

    const { newPassword, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
                newPassword
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate('/'); 
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to reset password.');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center ${outerBgColor}`}>
            <div className={`w-10/12 md:w-5/6 lg:w-4/5 xl:w-3/4 ${innerBgColor} p-12 rounded-xl shadow-xl flex`}>
                {/* Image */}
                <div className="w-1/2 h-full flex justify-center items-center pr-8">
                    <img src="/reset_password.png" alt="Reset Password" className="w-full h-auto" />
                </div>

                {/* Text Content */}
                <div className="w-1/2 flex flex-col justify-center items-start ml-8">
                    <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
                    <p className="text-sm text-gray-600 mb-4">Type and confirm a secure new password</p>

                    {/* Form */}
                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                        {/* New Password Input */}
                        <div className="mb-6 w-full">
                            <label htmlFor="newPassword" className="block text-black text-sm font-bold mb-2 text-left">New Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    id="newPassword" 
                                    className="w-full p-2 border rounded-md" 
                                    placeholder="Enter new password" 
                                    value={newPassword}
                                    onChange={handleChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="absolute top-0 right-0 mt-2 mr-2"
                                    onClick={handleTogglePasswordVisibility}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-6 w-full">
                            <label htmlFor="confirmPassword" className="block text-black text-sm font-bold mb-2 text-left">Confirm Password</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    id="confirmPassword" 
                                    className="w-full p-2 border rounded-md" 
                                    placeholder="Confirm new password" 
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="absolute top-0 right-0 mt-2 mr-2"
                                    onClick={handleToggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Message */}
                        {message && <p className="text-red-500 mb-4">{message}</p>}

                        {/* Reset Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-900 mb-4"
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;