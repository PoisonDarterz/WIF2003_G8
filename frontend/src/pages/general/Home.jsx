import React, { useRef } from 'react';
import TopNavBlack from "../../components/TopNavBlack";

// Import images
const missionImage = process.env.PUBLIC_URL + '/mission.png';
const visionImage = process.env.PUBLIC_URL + '/vision.png';
const objectivesImage = process.env.PUBLIC_URL + '/objective.png';

const Home = () => {
    const backgroundImage = process.env.PUBLIC_URL + '/Home.png';  // Path to the background image
    const aboutUsRef = useRef(null);

    const scrollToAboutUs = () => {
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative overflow-hidden">
            <TopNavBlack />
            <div 
                className="absolute top-0 left-0 w-full h-screen bg-cover bg-no-repeat" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-50 z-0"></div>
            
            <div className="container mx-auto h-screen flex flex-col justify-center items-center relative z-10">
                <h1 className="text-6xl font-bold mb-4 text-white text-center">Welcome to</h1>
                <h2 className="text-6xl font-bold mb-4 text-white text-center">Employee Connect Suite</h2>
                <p className="text-xl text-white text-center">
                    Employee Connect Suite, your all-in-one solution for streamlined HR management and enhanced employee communication.
                </p>
                <button 
                    onClick={scrollToAboutUs} 
                    className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Learn More
                </button>
            </div>

            {/* About Us Section */}
            <div ref={aboutUsRef} className="min-h-screen flex flex-col justify-center items-center bg-white relative z-10">
                <h1 className="text-6xl font-bold mb-8 text-gray-800">About Us</h1>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-8">
                    {/* Mission */}
                    <div className="flex flex-col justify-center items-center space-y-6 p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 rounded-lg">
                        <img src={missionImage} alt="Mission" className="mb-4 w-36 h-36 object-cover rounded-full"/>
                        <h2 className="text-4xl font-bold mb-4 text-gray-700">Our Mission</h2>
                        <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                            <li className="mb-2">Provide an intuitive platform to manage HR operations and cultivate a positive work environment.</li>
                        </ul>
                    </div>
                    {/* Objectives */}
                    <div className="flex flex-col justify-center items-center space-y-6 p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 rounded-lg">
                        <img src={objectivesImage} alt="Objectives" className="mb-4 w-36 h-36 object-cover rounded-full"/>
                        <h2 className="text-4xl font-bold mb-4 text-gray-700">Objectives</h2>
                        <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                            <li className="mb-2">Streamline HR operations with a centralized platform encompassing leave, attendance, and salary processing.</li>
                            <li className="mb-2">Enhance employee engagement through seamless access to essential information like leave applications and salary details.</li>
                            <li className="mb-2">Automate key processes to enable entrepreneurs to be more efficient, reducing manual workload and errors.</li>
                        </ul>
                    </div>
                    {/* Vision */}
                    <div className="flex flex-col justify-center items-center space-y-6 p-6 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 rounded-lg">
                        <img src={visionImage} alt="Vision" className="mb-4 w-36 h-36 object-cover rounded-full"/>
                        <h2 className="text-4xl font-bold mb-4 text-gray-700">Our Vision</h2>
                        <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                            <li className="mb-2">Lead in HR management with innovative technology and personalized support for operational excellence and employee satisfaction.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;