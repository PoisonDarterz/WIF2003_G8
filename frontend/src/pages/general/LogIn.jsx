import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();

    const leftBgColor = 'bg-teal-200'; // Background color for the left side
    const rightBgColor = 'bg-gray-100'; // Background color for the right side

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling login
        // For now, just navigate to the home page
        navigate('/');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className={`w-1/2 ${leftBgColor} flex flex-col justify-center items-center text-black p-10`}>
                <h1 className="text-4xl font-bold mb-4">Employee Connect Suite</h1>
                <p className="italic text-center">Empowering Connections, Elevating Success.</p>
                <img src="/employee.png" alt="Employee" className="mt-8" />
            </div>

            {/* Right Side */}
            <div className={`w-1/2 ${rightBgColor} flex flex-col justify-center items-center p-10 text-black`}>
                <h2 className="text-2xl font-bold mb-4">Log In</h2>

                {/* Form */}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4 flex flex-col w-full">
                        <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2 text-left">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 flex flex-col w-full">
                        <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2 text-left">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>

                    {/* Login Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-900"
                    >
                        Log In
                    </button>

                    {/* Forgot Password */}
                    <p className="text-sm mt-4">
                        <Link to="/forgot-password" className="text-blue-500 underline">Forgot your password?</Link>
                    </p>

                    {/* Sign Up */}
                    <p className="text-gray-500 text-sm mt-4">
                        Don't have an account? 
                        <Link to="/signup" className="text-black underline ml-1">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogIn;