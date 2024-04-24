import React, { useState } from 'react';
import { FaThumbsUp, FaTags, FaChevronDown, FaChevronUp, FaBuilding, FaBrain, FaUsers, FaChartBar } from 'react-icons/fa'; // Importing FontAwesome icons

const CommunitySidebar = () => {
    const [likes, setLikes] = useState({
        james: { count: 35, liked: false },
        jonas: { count: 20, liked: false },
        wengHong: { count: 10, liked: false },
    });

    const [expandedItem, setExpandedItem] = useState(null);

    const handleLikeClick = (name) => {
        setLikes(prevLikes => {
            const updatedLikes = { ...prevLikes };
            
            if (!updatedLikes[name].liked) {
                updatedLikes[name] = { count: prevLikes[name].count + 1, liked: true };
            } else {
                updatedLikes[name] = { count: prevLikes[name].count - 1, liked: false };
            }

            return updatedLikes;
        });
    };

    const toggleExpand = (item) => {
        setExpandedItem(expandedItem === item ? null : item);
    };

    const trendingTopics = [
        { title: 'Office Insights', icon: <FaBuilding /> },
        { title: 'Mental Health', icon: <FaBrain /> },
        { title: 'Team Building', icon: <FaUsers /> },
        { title: 'Productivity Tips', icon: <FaChartBar /> },
    ];

    return (
        <div className="sticky top-4 w-1/5 pr-4">
            <div className="sticky top-4 mb-8">
                {/* Popular Posts */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FaThumbsUp className="mr-2 text-blue-600" /> Popular Posts
                    </h2>
                    {Object.keys(likes).map(name => (
                        <div key={name} className="bg-white p-4 rounded shadow-md mt-4 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <div className="flex items-center mb-2">
                                <img src='/james.png' alt="User" className="w-10 h-10 rounded-full mr-4 object-cover" />
                                <div className='text-left'>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-1">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                                    <p className="text-sm text-gray-500">"Enjoying a productive day at the office with this amazing team! 📈"</p>
                                    <button 
                                        className={`flex items-center ${likes[name].liked ? 'text-blue-600' : 'text-gray-600'} focus:outline-none`}
                                        onClick={() => handleLikeClick(name)}
                                    >
                                        <FaThumbsUp className="mr-1" />
                                        {likes[name].count} Likes
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trending Topics */}
                <div sticky top-4 className='sticky top-4 mt-12'>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FaTags className="mr-2 text-blue-600" /> Trending Topics
                    </h2>
                    <ul className="text-gray-700">
                        {trendingTopics.map((topic, index) => (
                            <li key={index} className="mb-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 text-left">
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(topic.title)}>
                                    <div className="flex items-center">
                                        {topic.icon}
                                        <span className="ml-2">{topic.title}</span>
                                    </div>
                                    {expandedItem === topic.title ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
                                </div>
                                {expandedItem === topic.title && (
                                    <ul className="list-disc list-inside pl-4">
                                        <li>Subtopic 1</li>
                                        <li>Subtopic 2</li>
                                        <li>Subtopic 3</li>
                                        <li>Subtopic 4</li>
                                        <li>Subtopic 5</li>
                                        <li>Subtopic 6</li>
                                        {/* Add more subtopics as needed */}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CommunitySidebar;
