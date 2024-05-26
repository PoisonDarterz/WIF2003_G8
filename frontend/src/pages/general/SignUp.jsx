import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeID: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Employee'
    });

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const { employeeID, email, password, confirmPassword, role } = formData;

    const leftBgColor = 'bg-teal-200';
    const rightBgColor = 'bg-gray-100';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                employeeID,
                email,
                password,
                role
            });

            setMessage('Account created successfully. Please check your email for verification.');
            setIsSuccess(true);

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className={`w-1/2 ${leftBgColor} flex flex-col justify-center items-center text-black p-10`}>
                <h1 className="text-5xl font-bold mb-4">Employee Connect Suite</h1>
                <p className="italic text-center">Empowering Connections, Elevating Success.</p>
                <img src="/employee.png" alt="Employee" className="mt-8" />
            </div>

            <div className={`w-1/2 ${rightBgColor} flex flex-col justify-center items-center p-10 text-black`}>
                <h2 className="text-4xl font-bold mb-4">Sign Up</h2>

                {message && <p className={`mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-6 w-full">
                        <label htmlFor="employeeID" className="block text-black text-sm font-bold mb-2 text-left">Employee ID</label>
                        <input 
                            type="text" 
                            id="employeeID" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your Employee ID" 
                            value={formData.employeeID}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="mb-6 w-full">
                        <label htmlFor="email" className="block text-black text-sm font-bold mb-2 text-left">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="mb-6 w-full">
                        <label htmlFor="password" className="block text-black text-sm font-bold mb-2 text-left">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter your password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="mb-6 w-full">
                        <label htmlFor="confirmPassword" className="block text-black text-sm font-bold mb-2 text-left">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Confirm your password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="mb-6 w-full">
                        <label htmlFor="role" className="block text-black text-sm font-bold mb-2 text-left">Role</label>
                        <select 
                            id="role" 
                            className="w-full p-2 border rounded-md" 
                            value={formData.role}
                            onChange={handleChange}
                            required 
                        >
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-900 mb-4"
                    >
                        Sign Up
                    </button>

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
