import React from "react";
import { useNavigate } from "react-router-dom";
import streamimg from "../assets/Live-Streaming-Platform.webp";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#1F1E24] py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Hero Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src={streamimg}
            alt="Streaming Service"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-4xl font-bold text-white mb-6">
            About Our Streaming Service
          </h1>
          <p className="text-white text-lg mb-6">
            Welcome to our movie streaming platform, your go-to destination for
            an extensive collection of movies, TV shows, and exclusive content.
            We bring you the best entertainment right to your screen with
            seamless streaming and personalized recommendations.
          </p>
          <ul className="space-y-4 text-lg text-white">
            <li>🎬 Unlimited Movies and Shows</li>
            <li>💻 HD and 4K Streaming Available</li>
            <li>🔍 Personalized Recommendations</li>
            <li>📱 Cross-Platform Support</li>
            <li>📥 Offline Downloads</li>
          </ul>
          <button
            onClick={() => navigate(-1)} // Navigate to the previous page
            className="mt-5 ml-10  bg-[#6556cd] text-white px-4 py-2 rounded hover:bg-violet-800 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
