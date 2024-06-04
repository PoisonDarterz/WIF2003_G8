import React, { useState, useEffect } from 'react';
import { FaReply } from 'react-icons/fa';
import moment from 'moment';

const CommentSection = ({ postId, comments }) => {
    const [newComments, setNewComments] = useState(Array(comments.length).fill(''));
    const [replyingTo, setReplyingTo] = useState(Array(comments.length).fill(-1));
    const [newCommentText, setNewCommentText] = useState('');
    const [newReplies, setNewReplies] = useState(Array(comments.length).fill(''));
    const [updatedComments, setUpdatedComments] = useState(comments);

    useEffect(() => {
        setUpdatedComments(comments);
    }, [comments]);

    const handleCommentChange = (e, index) => {
        const updatedComments = [...newComments];
        updatedComments[index] = e.target.value;
        setNewComments(updatedComments);
    };

    const handleReplyChange = (e, index) => {
        const updatedReplies = [...newReplies];
        updatedReplies[index] = e.target.value;
        setNewReplies(updatedReplies);
    };

    const handleSubmitComment = async (index) => {
        try {
            const response = await fetch(`http://localhost:5000/api/community/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentText: newComments[index], employeeId: '123' })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedPost = await response.json();
            setNewComments(Array(updatedPost.comments.length).fill(''));
            setUpdatedComments(updatedPost.comments);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleNewCommentChange = (e) => {
        setNewCommentText(e.target.value);
    };

    const handleNewCommentSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/community/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentText: newCommentText, employeeId: '123' })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedPost = await response.json();
            setNewComments(Array(updatedPost.comments.length).fill(''));
            setNewCommentText('');
            setUpdatedComments(updatedPost.comments);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleSubmitReply = async (commentId, index) => {
        try {
            const response = await fetch(`http://localhost:5000/api/community/posts/${postId}/comments/${commentId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ replyText: newReplies[index], employeeId: '123' })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedPost = await response.json();
            setNewReplies(Array(updatedPost.comments.length).fill(''));
            setUpdatedComments(updatedPost.comments);
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    const toggleReply = (index) => {
        const newRepliesState = [...replyingTo];
        newRepliesState[index] = (newRepliesState[index] === -1) ? index : -1;
        setReplyingTo(newRepliesState);
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            {updatedComments.map((comment, index) => (
                <div key={comment._id} className="mb-4 border-b pb-4">
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
                                        value={newReplies[index]}
                                        onChange={(e) => handleReplyChange(e, index)}
                                    ></textarea>
                                    <button
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        onClick={() => handleSubmitReply(comment._id, index)}
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
                                <div key={reply._id} className="flex items-start mb-2">
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
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                ></textarea>
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleNewCommentSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CommentSection;

