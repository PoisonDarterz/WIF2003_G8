import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa'; // Importing FontAwesome icons
import CommentSection from './CommentSection'; // Import your CommentSection component
import moment from 'moment';

const CommunityPost = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentsShown, setIsCommentsShown] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/community/posts/${postId}`) // replace with your backend URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post data:', error));
    }, [postId]);

    const toggleLike = () => setIsLiked(!isLiked);
    const toggleComments = () => setIsCommentsShown(!isCommentsShown);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
                <img src={post.employee.profilePicURL} alt="User" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">{post.employee.name}</h4>
                    <p className="text-sm text-gray-500">{moment(post.postTime).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
            </div>
            <div className="mb-4">
                <p className="text-gray-700">{post.postCaption}</p>
            </div>
            <div className="mb-4">
                <img src={post.postImageSrc} alt="Post" className="w-full h-64 object-cover rounded-md mb-2" />
            </div>
            <div className="flex justify-between items-center">
                <button 
                    className={`flex items-center ${isLiked ? 'text-blue-600' : 'text-gray-500'} hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    onClick={toggleLike}
                >
                    <FaThumbsUp className="mr-2" /> {post.likes} Likes
                </button>
                <button 
                    className={`flex items-center ${isCommentsShown ? 'text-blue-600' : 'text-gray-500'} hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    onClick={toggleComments}
                >
                    <FaComment className="mr-2" /> {post.comments.length} Comments
                </button>
            </div>
            {isCommentsShown && <CommentSection comments={post.comments} />}
        </div>
    );
};

export default CommunityPost;
