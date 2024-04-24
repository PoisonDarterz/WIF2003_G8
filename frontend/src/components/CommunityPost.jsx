import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa'; // Importing FontAwesome icons
import CommentSection from './CommentSection';

const CommunityPost = ({ 
    username, 
    postTime, 
    userProfileSrc, 
    postImageSrc, 
    postCaption, 
    likes, 
    comments 
}) => {
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // Example comments array based on the number of comments passed
    const commentsArray = Array.from({ length: comments }, (_, index) => ({
        userProfileSrc: "/Profile_image.jpg",
        username: `Commenter ${index + 1}`,
        commentTime: "Just now",
        commentText: `This is comment ${index + 1}`
    }));

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
                <img src={userProfileSrc} alt="User" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">{username}</h4>
                    <p className="text-sm text-gray-500">{postTime}</p>
                </div>
            </div>
            <div className="mb-4">
                <p className="text-gray-700">{postCaption}</p>
            </div>
            <div className="mb-4">
                <img src={postImageSrc} alt="Post" className="w-full h-64 object-cover rounded-md mb-2" />
            </div>
            <div className="flex justify-between items-center">
                <button 
                    className="flex items-center text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <FaThumbsUp className="mr-2" /> {likes} Likes
                </button>
                <button 
                    className="flex items-center text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={toggleComments}
                >
                    <FaComment className="mr-2" /> {comments} Comments
                </button>
            </div>
            {showComments && <CommentSection comments={commentsArray} />}
        </div>
    );
};

export default CommunityPost;
