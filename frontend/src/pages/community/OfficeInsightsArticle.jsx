import React from 'react';
import TopNavBlack from '../../components/TopNavBlack';

const OfficeInsightsArticle = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <TopNavBlack />
            <div className="container mx-auto px-4 lg:px-20 py-8">
                <div className="flex flex-col lg:flex-row">
                    {/* Main content */}
                    <div className="lg:w-2/3 pr-0 lg:pr-12">
                        <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">
                            Office Insights: Navigating the Modern Workplace
                        </h1>
                        <img 
                            src="/officeImage.jpg" 
                            alt="Office Insights" 
                            className="w-full rounded-lg mb-8 shadow-lg"
                        />
                        <div className="text-gray-700 text-justify">
                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">The Difference Between Yes and No</h2>
                                <p className="mb-6">
                                    The words “yes” and “no” are often used interchangeably, but they carry different weights when it comes to commitment. Saying "no" might seem simple, but it signifies a clear decision to decline a single option. On the other hand, saying "yes" involves committing to a task while simultaneously declining countless other opportunities.
                                </p>
                                <p className="mb-6">
                                    As economist Tim Harford aptly puts it, “Every time we say yes to a request, we are also saying no to anything else we might accomplish with the time.” Once you've committed to something, you've already decided how your future time will be allocated.
                                </p>
                                <p className="mb-6">
                                    Essentially, saying no saves future time, while saying yes consumes it. "No" is a form of time credit, granting you the freedom to spend your future as you see fit. "Yes" is a time debt, a commitment you'll need to honor at some point.
                                </p>
                                <p className="font-semibold">No is a decision. Yes is a responsibility.</p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">The Role of No</h2>
                                <p className="mb-6">
                                    Saying no is often perceived as a luxury reserved for those in power. However, it's a crucial tool for anyone aiming to manage their time effectively. By saying no, you preserve your time and energy for the tasks that truly matter to you.
                                </p>
                                <p className="mb-6">
                                    In practice, saying no can help you avoid overcommitting and becoming overwhelmed. It's worth considering whether a request is necessary or if a simple "no" would be more productive.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Managing Your Time Effectively</h2>
                                <p className="mb-6">
                                    Time management is an essential skill in the modern workplace. It involves prioritizing tasks, setting clear goals, and knowing when to say no. Effective time management helps reduce stress and increases productivity, allowing you to achieve more in less time.
                                </p>
                                <p className="mb-6">
                                    One effective strategy is to break your day into focused work sessions with regular breaks. This approach, known as the Pomodoro Technique, can help maintain high levels of productivity while avoiding burnout.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Creating a Balanced Work Environment</h2>
                                <p className="mb-6">
                                    A balanced work environment is crucial for both personal well-being and professional success. This balance can be achieved through flexible work arrangements, supportive company culture, and prioritizing mental health.
                                </p>
                                <p className="mb-6">
                                    Employers should encourage regular breaks, provide opportunities for professional development, and foster a collaborative and inclusive workplace. Employees, in turn, should practice self-care and time management to maintain their productivity and job satisfaction.
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
                                    <a href="https://www.hbr.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Harvard Business Review</a>
                                </li>
                                <li>
                                    <a href="https://www.forbes.com/work/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Forbes Work</a>
                                </li>
                                <li>
                                    <a href="https://www.mckinsey.com/business-functions/organization/our-insights" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">McKinsey Insights</a>
                                </li>
                                <li>
                                    <a href="https://www.gallup.com/topic/workplace.aspx" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Gallup Workplace</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeInsightsArticle;
