import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const outerBgColor = 'bg-teal-200'; // Background color for the outer div
    const innerBgColor = 'bg-gray-100'; // Background color for the inner rectangle
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center ${outerBgColor}`}>
            <div className={`w-10/12 md:w-5/6 lg:w-4/5 xl:w-3/4 ${innerBgColor} p-12 rounded-xl shadow-xl flex`}>
                {/* Image */}
                <div className="w-1/2 h-full flex justify-center items-center pr-8">
                    <img src="/forgot_password.png" alt="Forgot Password" className="w-full h-auto" />
                </div>

                {/* Text Content */}
                <div className="w-1/2 flex flex-col justify-center items-start ml-8">
                    <h1 className="text-4xl font-bold mb-2">Forgot your password?</h1>
                    <p className="text-sm text-gray-600 mb-4">Provide your email and we’ll send you a link to reset your password.</p>

                    {/* Form */}
                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-6 w-full">
                            <label htmlFor="email" className="block text-black text-sm font-bold mb-2 text-left">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="w-full p-2 border rounded-md" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        {/* Message */}
                        {message && <p className="text-red-500 mb-4">{message}</p>}

                        {/* Reset Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-900 mb-4"
                        >
                            Submit
                        </button>

                        {/* Back to Login */}
                        <p className="text-sm text-center">
                            Back to 
                            <Link to="/" className="text-black underline ml-1">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
