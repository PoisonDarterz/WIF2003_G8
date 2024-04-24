import React from 'react';

const CommunityCard = ({ title, description, imageUrl }) => {
    const cardStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div 
            className="bg-s p-9 rounded shadow-md hover:bg-gray-700 hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-4"
            style={cardStyle}
        >
            <div className="bg-white opacity-50 absolute inset-0 rounded transition duration-300 ease-in-out hover:opacity-0"></div>
            <h3 className="text-xl font-semibold z-10 relative">{title}</h3>
            <p className="z-10 relative">{description}</p>
        </div>
    );
};

export default CommunityCard;
