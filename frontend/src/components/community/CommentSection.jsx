import React, { useState } from 'react';
import { FaReply, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Importing FontAwesome icons

const CommentSection = ({ comments }) => {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(Array(comments.length).fill(-1));
    const [upvotedComments, setUpvotedComments] = useState([]);
    const [downvotedComments, setDownvotedComments] = useState([]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = () => {
        console.log('New comment:', newComment);
        setNewComment('');
    };

    const toggleReply = (index) => {
        const newRepliesState = [...replyingTo];
        newRepliesState[index] = (newRepliesState[index] === -1) ? index : -1;
        setReplyingTo(newRepliesState);
    };

    const toggleUpvote = (index) => {
        if (upvotedComments.includes(index)) {
            setUpvotedComments(upvotedComments.filter(item => item !== index));
        } else {
            setUpvotedComments([...upvotedComments, index]);
            setDownvotedComments(downvotedComments.filter(item => item !== index));
        }
    };

    const toggleDownvote = (index) => {
        if (downvotedComments.includes(index)) {
            setDownvotedComments(downvotedComments.filter(item => item !== index));
        } else {
            setDownvotedComments([...downvotedComments, index]);
            setUpvotedComments(upvotedComments.filter(item => item !== index));
        }
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

                            <div className="flex items-center mt-2">
                                <button 
                                    className={`flex items-center text-gray-500 hover:text-blue-500 ${upvotedComments.includes(index) ? 'text-blue-500' : 'text-gray-500'}`}
                                    onClick={() => toggleUpvote(index)}
                                >
                                    <FaArrowUp className="mr-1" /> Upvote
                                </button>
                                <button 
                                    className={`flex items-center text-gray-500 hover:text-red-500 ml-4 ${downvotedComments.includes(index) ? 'text-red-500' : 'text-gray-500'}`}
                                    onClick={() => toggleDownvote(index)}
                                >
                                    <FaArrowDown className="mr-1" /> Downvote
                                </button>
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
