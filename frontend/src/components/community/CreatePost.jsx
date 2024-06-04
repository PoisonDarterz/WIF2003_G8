import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const CreatePost = ({ addPost }) => {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);

    const handleCreatePostClick = () => {
        setShowCreatePost(true);
    };

    

    const handlePostSubmit = async () => {
        const postData = new FormData();
        postData.append('postCaption', newPostContent);
        if (newPostImage) {
            postData.append('postImage', newPostImage);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/community/posts', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
            {/* Modal for creating a new post */}
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

            {/* Button to trigger the create post modal */}
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
