import React, { useState } from 'react';
import { FaReply, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Importing FontAwesome icons

const CommentSection = ({ comments }) => {
    const [newComment, setNewComment] = useState('');
    const [isReplying, setIsReplying] = useState(false);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = () => {
        // Handle submitting the new comment, for now just log it
        console.log('New comment:', newComment);
        setNewComment(''); // Clear the input field after submitting
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            {comments.map((comment, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                    <div className="flex items-start mb-2">
                        <img src={comment.userProfileSrc} alt="User" className="w-10 h-10 rounded-full mr-4 object-cover" />
                        <div className="flex-grow">
                            <div className="flex items-center mb-2">
                                <h4 className="text-lg font-semibold text-gray-800">{comment.username}</h4>
                                <p className="text-sm text-gray-500 ml-2">{comment.commentTime}</p>
                            </div>
                            <p className="text-gray-700 text-left">{comment.commentText}</p>

                            {/* Actions */}
                            <div className="flex items-center mt-2">
                                <button className="flex items-center text-gray-500 hover:text-blue-500">
                                    <FaArrowUp className="mr-1" /> Upvote
                                </button>
                                <button className="flex items-center text-gray-500 hover:text-red-500 ml-4">
                                    <FaArrowDown className="mr-1" /> Downvote
                                </button>
                                <button 
                                    className="flex items-center text-blue-500 hover:underline ml-4"
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    <FaReply className="mr-1" /> Reply
                                </button>
                            </div>

                            {/* Reply */}
                            {isReplying && (
                                <div className="mt-2">
                                    <textarea
                                        className="w-full p-2 rounded-md border"
                                        placeholder="Write a reply..."
                                        value={newComment}
                                        onChange={handleCommentChange}
                                    ></textarea>
                                    <button
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        onClick={handleSubmitComment}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies && (
                        <div className="ml-16 mt-4">
                            {comment.replies.map((reply, idx) => (
                                <div key={idx} className="flex items-start mb-2">
                                    <img src={reply.userProfileSrc} alt="User" className="w-8 h-8 rounded-full mr-2 object-cover" />
                                    <div className="flex-grow">
                                        <div className="flex items-center mb-2">
                                            <h4 className="text-sm font-semibold text-gray-800">{reply.username}</h4>
                                            <p className="text-xs text-gray-500 ml-2">{reply.replyTime}</p>
                                        </div>
                                        <p className="text-sm text-gray-700">{reply.replyText}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Add new comment section */}
            <div className="mt-4">
                <textarea
                    className="w-full p-2 rounded-md border"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                ></textarea>
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleSubmitComment}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
