import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex w-screen justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#6556cd] border-solid border-opacity-75"></div>
    </div>
  );
};

export default LoadingSpinner;
