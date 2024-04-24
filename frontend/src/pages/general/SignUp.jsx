import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const leftBgColor = 'bg-teal-200'; // Background color for the left side
    const rightBgColor = 'bg-gray-100'; // Background color for the right side

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling sign up
        // For now, just navigate to the login page
        navigate('/');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className={`w-1/2 ${leftBgColor} flex flex-col justify-center items-center text-black p-10`}>
                <h1 className="text-5xl font-bold mb-4">Employee Connect Suite</h1>
                <p className="italic text-center">Empowering Connections, Elevating Success.</p>
                <img src="/employee.png" alt="Employee" className="mt-8" />
            </div>

            {/* Right Side */}
            <div className={`w-1/2 ${rightBgColor} flex flex-col justify-center items-center p-10 text-black`}>
                <h2 className="text-4xl font-bold mb-4">Sign Up</h2>

                {/* Form */}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    {/* Employee ID Input */}
                    <div className="mb-6 w-full">
                        <label htmlFor="employeeID" className="block text-black text-sm font-bold mb-2 text-left">Employee ID</label>
                        <input 
                            type="text" 
                            id="employeeID" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your Employee ID" 
                            required 
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-6 w-full">
                        <label htmlFor="email" className="block text-black text-sm font-bold mb-2 text-left">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 w-full">
                        <label htmlFor="password" className="block text-black text-sm font-bold mb-2 text-left">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-6 w-full">
                        <label htmlFor="confirmPassword" className="block text-black text-sm font-bold mb-2 text-left">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Confirm your password" 
                            required 
                        />
                    </div>

                    {/* Role Input */}
                    <div className="mb-6 w-full">
                        <label htmlFor="role" className="block text-black text-sm font-bold mb-2 text-left">Role</label>
                        <select 
                            id="role" 
                            className="w-full p-2 border rounded-md" 
                            required 
                        >
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    {/* Sign Up Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-900 mb-4"
                    >
                        Sign Up
                    </button>

                    {/* Sign Up */}
                    <p className="text-gray-500 text-sm mt-4">
                        Already have an account?
                        <Link to="/" className="text-black underline ml-1">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
