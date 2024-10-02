import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex w-screen justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-[#6556cd] border-solid border-opacity-75 h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32"></div>
    </div>
  );
};

export default LoadingSpinner;
