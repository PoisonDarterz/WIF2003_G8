import React, { useState, useEffect } from 'react';
import TopNavBlack from '../../components/TopNavBlack';
import CommunityCard from '../../components/community/CommunityCard';
import CommunityPost from '../../components/community/CommunityPost';
import CreatePost from '../../components/community/CreatePost';
import axios from 'axios';
import moment from 'moment';

const CommunityHomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/community/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="flex flex-col h-screen">    
            <TopNavBlack />
                <div className=" justify-center" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="justify-center flex overflow-x-auto space-x-4 min-w-[calc(25% - 1rem)] h-[fit-content]">
                        <CommunityCard 
                            title="Office Insights" 
                            description="24th April 2024" 
                            imageUrl='/officeImage.jpg'
                            route="/community/OfficeInsightsArticle"
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
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Community Posts and Forums</h2>
                        <div className="text-justify mx-auto max-w-2xl">
                            {posts.map((post, index) => (
                                <CommunityPost 
                                    key={index}
                                    postId={post.postId}
                                    username={post.employee.name}
                                    postTime={moment(post.postTime).format('MMMM Do YYYY, h:mm a')}
                                    userProfileSrc={post.employee.profilePicURL}
                                    postCaption={post.postCaption}
                                    postImageSrc={post.postImageSrc}
                                    likes={post.likes}
                                    comments={post.comments.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            <CreatePost addPost={addPost} />
        </div>
    );
};

export default CommunityHomePage;
