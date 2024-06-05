import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePost = ({ addPost }) => {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        // Fetch the user profile to get the employee ID
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/my-profile', {
                    withCredentials: true // Include credentials (cookies) in the request
                });
                setEmployeeId(response.data.id); // Assuming the employee ID is stored in response.data.id
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleCreatePostClick = () => {
        setShowCreatePost(true);
    };

    const handlePostSubmit = async () => {
        const postData = new FormData();
        postData.append('postCaption', newPostContent);
        if (newPostImage) {
            postData.append('postImage', newPostImage);
        }
        postData.append('employeeId', employeeId); // Use the fetched employee ID

        try {
            const response = await axios.post('http://localhost:5000/api/community/posts', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true // Include credentials (cookies) in the request
            });
            const newPost = response.data;
            addPost(newPost);
            setShowCreatePost(false);
            setNewPostContent('');
            setNewPostImage(null);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setNewPostImage(file);
    };

    return (
        <div>
            {showCreatePost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Create a New Post</h2>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Write your caption here..."
                            rows="4"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="mb-4"
                            onChange={handleImageUpload}
                        />
                        <div className="flex justify-end space-x-4">
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded" 
                                onClick={handlePostSubmit}
                            >
                                Submit
                            </button>
                            <button 
                                className="bg-gray-300 text-black px-4 py-2 rounded" 
                                onClick={() => setShowCreatePost(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button 
                className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl"
                onClick={handleCreatePostClick}
            >
                +
            </button>
        </div>
    );
};

export default CreatePost;


