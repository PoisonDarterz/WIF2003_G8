import React from 'react';
import { FaReply } from 'react-icons/fa'; // Importing FontAwesome icons

const CommentSection = ({ comments }) => {
    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
            {comments.map((comment, index) => (
                <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                        <img src={comment.userProfileSrc} alt="User" className="w-10 h-10 rounded-full mr-4 object-cover" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">{comment.username}</h4>
                            <p className="text-sm text-gray-500">{comment.commentTime}</p>
                        </div>
                    </div>
                    <p className="text-gray-700">{comment.commentText}</p>

                    {/* Replies */}
                    {comment.replies && (
                        <div className="ml-12 mt-2">
                            {comment.replies.map((reply, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <img src={reply.userProfileSrc} alt="User" className="w-8 h-8 rounded-full mr-2 object-cover" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">{reply.username}</h4>
                                        <p className="text-xs text-gray-500">{reply.replyTime}</p>
                                        <p className="text-sm text-gray-700">{reply.replyText}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Reply button */}
                    <button className="flex items-center text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        <FaReply className="mr-2" /> Reply
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CommentSection;
