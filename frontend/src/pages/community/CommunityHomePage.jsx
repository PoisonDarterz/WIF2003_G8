import React from 'react';
import TopNavBlack from '../../components/TopNavBlack';
import CommunityCard from '../../components/community/CommunityCard';
import CommunityPost from '../../components/community/CommunityPost';
import CommunitySidebar from '../../components/community/CommunitySideBar';

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
                        <CommunityCard title="Office Insights" description="Description for Card 1" imageUrl='/officeImage.jpg'/>
                        <CommunityCard title="Mental Health" description="Description for Card 2" imageUrl='/officeImage.jpg'/>
                        <CommunityCard title="Team Building" description="Description for Card 3" imageUrl='/officeImage.jpg'/>

                        {/* Add more cards as needed */}
                    </div>

                    {/* Community Posts Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Community Posts and Forums</h2>
                        <div className="mx-auto max-w-2xl">
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
                                username="Jane Doe"
                                postTime="1 hour ago"
                                userProfileSrc="/Profile_image.jpg"
                                postCaption={"This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed."}
                                postImageSrc={"/officeImage.jpg"}
                                likes={10}
                                comments={7}
                            />
                            <CommunityPost 
                                username="Jane Doe"
                                postTime="1 hour ago"
                                userProfileSrc="/Profile_image.jpg"
                                postCaption={"This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed. This is a sample post caption. It can be as long as needed."}
                                postImageSrc={"/officeImage.jpg"}
                                likes={10}
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

