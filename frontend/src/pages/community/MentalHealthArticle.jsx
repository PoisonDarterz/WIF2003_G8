import React from 'react';
import TopNavBlack from '../../components/TopNavBlack';

const MentalHealthArticle = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <TopNavBlack />
            <div className="container mx-auto px-4 lg:px-20 py-8">
                <div className="flex flex-col lg:flex-row">
                    {/* Main content */}
                    <div className="lg:w-2/3 pr-0 lg:pr-12">
                        <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">
                            Understanding Mental Health: Importance and Strategies
                        </h1>
                        <img 
                            src="/mentalhealthworkshop.png" 
                            alt="Mental Health" 
                            className="w-full rounded-lg mb-8 shadow-lg"
                        />
                        <div className="text-gray-700 text-justify">
                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">The Importance of Mental Health</h2>
                                <p className="mb-6">
                                    Mental health is an essential component of overall well-being. It influences how we think, feel, and act. Good mental health allows individuals to cope with the stresses of life, work productively, and contribute to their community. Conversely, poor mental health can lead to problems in daily life, relationships, and physical health.
                                </p>
                                <p className="mb-6">
                                    Recognizing the importance of mental health is the first step toward improving it. This awareness can help reduce stigma and encourage people to seek help when needed.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Common Mental Health Issues</h2>
                                <p className="mb-6">
                                    Common mental health issues include anxiety, depression, bipolar disorder, and schizophrenia. Each condition has its own set of symptoms and challenges, but all can significantly impact a person's quality of life.
                                </p>
                                <p className="mb-6">
                                    It's important to recognize the signs of mental health issues and understand that they are treatable. Early intervention can make a significant difference in managing these conditions.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Strategies for Maintaining Mental Health</h2>
                                <p className="mb-6">
                                    Maintaining good mental health involves several strategies:
                                </p>
                                <ul className="list-disc list-inside mb-6">
                                    <li>Regular physical activity</li>
                                    <li>Healthy eating habits</li>
                                    <li>Regular sleep patterns</li>
                                    <li>Stress management techniques such as mindfulness and meditation</li>
                                    <li>Building and maintaining strong relationships</li>
                                    <li>Seeking professional help when needed</li>
                                </ul>
                                <p className="mb-6">
                                    Implementing these strategies can help individuals maintain their mental health and improve their overall well-being.
                                </p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-3xl font-semibold mb-4 text-gray-900">Seeking Professional Help</h2>
                                <p className="mb-6">
                                    Seeking professional help is a crucial step in managing mental health issues. Therapists, counselors, and psychiatrists can provide support, guidance, and treatment options. It's important to remember that seeking help is a sign of strength, not weakness.
                                </p>
                                <p className="mb-6">
                                    Many resources are available for those in need, including hotlines, support groups, and online therapy options.
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
                                    <a href="https://www.nami.org/Home" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">National Alliance on Mental Illness</a>
                                </li>
                                <li>
                                    <a href="https://www.mentalhealth.gov/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">MentalHealth.gov</a>
                                </li>
                                <li>
                                    <a href="https://www.who.int/mental_health/en/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">World Health Organization: Mental Health</a>
                                </li>
                                <li>
                                    <a href="https://www.mhanational.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mental Health America</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentalHealthArticle;
