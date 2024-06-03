import React from 'react';
import TopNavBlack from '../../components/TopNavBlack';

const TeamBuildingAnnouncement = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <TopNavBlack />
            <div className="container mx-auto px-4 lg:px-20 py-8">
                <div className="flex flex-col lg:flex-row">
                    {/* Main content */}
                    <div className="lg:w-2/3 pr-0 lg:pr-12">
                        <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">
                            Upcoming Team Building Activity
                        </h1>
                        <img 
                            src="/teambuildingcard.jpg" 
                            alt="Team Building" 
                            className="w-full rounded-lg mb-8 shadow-lg"
                        />
                        <div className="text-gray-700 text-justify">
                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Why Team Building is Important</h2>
                                <p className="mb-6">
                                    Team building activities are essential for fostering a positive work environment, enhancing communication among team members, and boosting overall productivity. These activities help build trust, mitigate conflicts, encourage collaboration, and foster deeper connections among colleagues. When employees feel connected and appreciated, they are more likely to be engaged and motivated in their work.
                                </p>
                                <p className="mb-6">
                                    Our upcoming team-building event is designed to provide a fun and engaging way to strengthen our team's bond, improve morale, and ensure that we continue to work effectively together.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Event Details</h2>
                                <p className="mb-6">
                                    <strong>Date:</strong> July 15, 2024<br />
                                    <strong>Time:</strong> 10:00 AM - 4:00 PM<br />
                                    <strong>Location:</strong> Central Park, Main Pavilion<br />
                                </p>
                                <p className="mb-6">
                                    The event will feature a variety of activities including:
                                </p>
                                <ul className="list-disc list-inside mb-6">
                                    <li>Ice-breaker games</li>
                                    <li>Team challenges and competitions</li>
                                    <li>Problem-solving exercises</li>
                                    <li>Outdoor sports and activities</li>
                                    <li>Group discussions and feedback sessions</li>
                                </ul>
                                <p className="mb-6">
                                    Lunch and refreshments will be provided. Please dress comfortably and be prepared for both indoor and outdoor activities. 
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">How to Participate</h2>
                                <p className="mb-6">
                                    Participation is highly encouraged as this is a valuable opportunity to connect with your colleagues in a relaxed and informal setting. Please RSVP by July 8, 2024, to ensure we have an accurate headcount for food and supplies.
                                </p>
                                <p className="mb-6">
                                    To RSVP, please contact Mr. Lee at <strong>lee@employeeconnect.com</strong> or <strong>+60163299348</strong>. If you have any dietary restrictions or special requirements, kindly let us know in advance.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:w-1/3 mt-12 lg:mt-0">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Related Links</h2>
                            <ul className="space-y-4">
                                <li>
                                    <a href="https://www.mindtools.com/pages/article/newLDR_82.htm" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Importance of Team Building</a>
                                </li>
                                <li>
                                    <a href="https://www.thebalancecareers.com/top-team-building-ideas-1918573" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Top Team Building Ideas</a>
                                </li>
                                <li>
                                    <a href="https://www.forbes.com/sites/forbeshumanresourcescouncil/2019/10/30/the-benefits-of-team-building-activities/?sh=749da7677404" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Benefits of Team Building Activities</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamBuildingAnnouncement;
