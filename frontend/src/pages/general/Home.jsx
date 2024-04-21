import React from "react";
import TopNavBlack from "../../components/TopNavBlack";

const Home = () => {
  const backgroundImage = process.env.PUBLIC_URL + "/Home.png"; // Path to the background image

  return (
    <div className="relative">
      <TopNavBlack />
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="container mx-auto h-screen flex flex-col justify-center items-center text-white relative z-10">
        <h1 className="text-6xl font-bold mb-4">Welcome to</h1>
        <h2 className="text-6xl font-bold mb-4">Employee Connect Suite</h2>
        <p className="text-xl text-center">
          Employee Connect Suite, your all-in-one solution for streamlined HR
          management and enhanced employee communication.
        </p>
      </div>
    </div>
  );
};

export default Home;
