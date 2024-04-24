import React from 'react';

const CommunitySidebar = () => {
    return (
        <div className="sticky top-4 w-1/5 pr-4">
            <div className="mb-8 sticky top-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Popular Posts</h2>
                {/* Example User Popularity */}
                <div className="bg-white p-4 rounded shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">James</h3>
                    <p className="text-gray-600">35 Likes</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md mt-4 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Jonas</h3>
                    <p className="text-gray-600">20 Likes</p>
                </div>
                <div className="bg-white p-4 rounded shadow-md mt-4 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Weng Hong</h3>
                    <p className="text-gray-600">10 Likes</p>
                </div>
                {/* Add more user popularity as needed */}

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800" >Trending Topics</h2>
                {/* Example Trending Topics */}
                <ul className="list-disc list-inside text-gray-700">
                    <li className="mb-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Office Insights
                    </li>
                    <li className="mb-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Mental Health
                    </li>
                    <li className="mb-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Team Building
                    </li>
                    {/* Add more topics as needed */}
                </ul>
            </div>

            
        </div>
    );
};

export default CommunitySidebar;

