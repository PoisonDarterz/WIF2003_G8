import React from 'react';
import TopNavBlack from '../../components/TopNavBlack';
import CommunityCard from '../../components/CommunityCard';
import CommunityPost from '../../components/CommunityPost';
import CommunitySidebar from '../../components/CommunitySideBar';

const CommunityHomePage = () => {
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
                        <CommunityCard title="Mental Health" description="5th May 2024" imageUrl='/mentalhealthworkshop.png'/>
                        <CommunityCard title="Team Building" description="16th May 2024" imageUrl='/teambuildingcard.jpg'/>

                        {/* Add more cards as needed */}
                    </div>

                    {/* Community Posts Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Community Posts and Forums</h2>
                        <div className="text-justify mx-auto max-w-2xl">
                            <CommunityPost 
                                username="John Doe"
                                postTime="2 hours ago"
                                userProfileSrc="/Profile_image.jpg"
                                postCaption={"This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed."}
                                postImageSrc={"/officeImage.jpg"}
                                likes={5}
                                comments={3}
                            />
                            <CommunityPost 
                                username="James"
                                postTime="1 hour ago"
                                userProfileSrc="/james.png"
                                postCaption={"Enjoying a productive day at the office with this amazing team! 📈"}
                                postImageSrc={"/team building post.jpeg"}
                                likes={35}
                                comments={4}
                            />
                            <CommunityPost 
                                username="Jack Lee"
                                postTime="2 hours ago"
                                userProfileSrc="/jackma.jpeg"
                                postCaption={"Thrilled to be joining the company summit! Looking forward to learning, networking, and contributing to our shared goals. Let's make this event unforgettable! 🚀 #CompanySummit #NewBeginnings"}
                                postImageSrc={"/jackma.jpeg"}
                                likes={20}
                                comments={7}
                            />
                            {/* Add more posts as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityHomePage;

