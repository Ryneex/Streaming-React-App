import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  
  return  (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-center">
      <h1 className="text-8xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-700">
        Oops! Page not found.
      </h2>
      <p className="mt-2 text-lg text-gray-500">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={()=>navigate(-1)}
      >
        Go Back
      </button>
     
    </div>
  );
};

export default NotFound;
