import React, { useState } from 'react';
import { FaReply } from 'react-icons/fa'; // Importing FontAwesome icons
import moment from 'moment';

const CommentSection = ({ comments }) => {
    const [newComments, setNewComments] = useState(Array(comments.length).fill(''));
    const [replyingTo, setReplyingTo] = useState(Array(comments.length).fill(-1));

    const handleCommentChange = (e, index) => {
        const updatedComments = [...newComments];
        updatedComments[index] = e.target.value;
        setNewComments(updatedComments);
    };

    const handleSubmitComment = (index) => {
        console.log('New comment:', newComments[index]);
        const updatedComments = [...newComments];
        updatedComments[index] = ''; // Clear the comment after submitting
        setNewComments(updatedComments);
    };

    const toggleReply = (index) => {
        const newRepliesState = [...replyingTo];
        newRepliesState[index] = (newRepliesState[index] === -1) ? index : -1;
        setReplyingTo(newRepliesState);
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            {comments.map((comment, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                    <div className="flex items-start mb-2">
                        <img src={comment.employee.profilePicURL} alt="User" className="w-10 h-10 rounded-full mr-4 object-cover" />
                        <div className="flex-grow">
                            <div className="flex items-center mb-2">
                                <h4 className="text-lg font-semibold text-gray-800">{comment.employee.name}</h4>
                                <p className="text-sm text-gray-500 ml-2">{moment(comment.commentTime).format('MMMM Do YYYY, h:mm a')}</p>
                            </div>
                            <p className="text-gray-700 text-left">{comment.commentText}</p>

                            <div className="flex items-center mt-2">
                                <button 
                                    className="flex items-center text-blue-500 hover:underline ml-4"
                                    onClick={() => toggleReply(index)}
                                >
                                    <FaReply className="mr-2" /> Reply
                                </button>
                            </div>

                            {replyingTo[index] === index && (
                                <div className="mt-2">
                                    <textarea
                                        className="w-full p-2 rounded-md border"
                                        placeholder="Write a reply..."
                                        value={newComments[index]}
                                        onChange={(e) => handleCommentChange(e, index)}
                                    ></textarea>
                                    <button
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        onClick={() => handleSubmitComment(index)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {comment.replies && (
                        <div className="ml-16 mt-4">
                            {comment.replies.map((reply, idx) => (
                                <div key={idx} className="flex items-start mb-2">
                                    <img src={reply.employee.profilePicURL} alt="User" className="w-8 h-8 rounded-full mr-2 object-cover" />
                                    <div className="flex-grow">
                                        <div className="flex items-center mb-2">
                                            <h4 className="text-sm font-semibold text-gray-800">{reply.employee.name}</h4>
                                            <p className="text-xs text-gray-500 ml-2">{moment(reply.replyTime).format('MMMM Do YYYY, h:mm a')}</p>
                                        </div>
                                        <p className="text-sm text-gray-700">{reply.replyText}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <div className="mt-4">
                <textarea
                    className="w-full p-2 rounded-md border"
                    placeholder="Write a comment..."
                    value={newComments[comments.length]}
                    onChange={(e) => handleCommentChange(e, comments.length)}
                ></textarea>
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleSubmitComment(comments.length)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CommentSection;

