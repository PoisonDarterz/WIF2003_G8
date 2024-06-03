// src/pages/community/CommunityHomePage.jsx
import React, { useState } from 'react';
import TopNavBlack from '../../components/TopNavBlack';
import CommunityCard from '../../components/community/CommunityCard';
import CommunityPost from '../../components/community/CommunityPost';
import CommunitySidebar from '../../components/community/CommunitySideBar';
import CreatePost from '../../components/community/CreatePost';
import axios from 'axios';

const CommunityHomePage = () => {
    const [posts, setPosts] = useState([
        {
            username: "John Doe",
            postTime: "2 hours ago",
            userProfileSrc: "/Profile_image.jpg",
            postCaption: "This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed.",
            postImageSrc: "/officeImage.jpg",
            likes: 5,
            comments: 3
        },
        // Add more initial posts as needed
    ]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="flex flex-col h-screen">
            <TopNavBlack />

            <div className="flex mt-8 px-4">
                {/* CommunitySidebar */}
                <CommunitySidebar />

                {/* Main Content */}
                <div className="w-2/4 basis-3/5">
                    {/* Horizontal Cards */}
                    <div className="justify-center flex overflow-x-auto space-x-4 min-w-[calc(25% - 1rem)] h-[fit-content]">
                        <CommunityCard 
                            title="Office Insights" 
                            description="24th April 2024" 
                            imageUrl='/officeImage.jpg'
                            route="/community/OfficeInsightsArticle"  // <-- Correct route path
                        />
                        <CommunityCard 
                            title="Mental Health" 
                            description="5th May 2024" 
                            imageUrl='/mentalhealthworkshop.png'
                            route="/community/MentalHealthArticle"
                        />
                        <CommunityCard 
                            title="Team Building" 
                            description="16th May 2024" 
                            imageUrl='/teambuildingcard.jpg'
                            route="/community/TeamBuildingAnnouncement"
                        />

                        {/* Add more cards as needed */}
                    </div>

                    {/* Community Posts Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Community Posts and Forums</h2>
                        <div className="text-justify mx-auto max-w-2xl">
                            {posts.map((post, index) => (
                                <CommunityPost 
                                    key={index}
                                    username={post.username}
                                    postTime={post.postTime}
                                    userProfileSrc={post.userProfileSrc}
                                    postCaption={post.postCaption}
                                    postImageSrc={post.postImageSrc}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Post Button and Modal */}
            <CreatePost addPost={addPost} />
        </div>
    );
};

export default CommunityHomePage;
