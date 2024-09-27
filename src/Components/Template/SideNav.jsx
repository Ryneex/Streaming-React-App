
import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  

  return (
    <div className=" w-[20%] h-full border-r-2 border-zinc-400 py-2 px-10">
      <h1 className="text-2xl text-white font-bold">
        <i className=" text-[#6556CD] mr-2 ri-tv-fill"></i>
        <span>StreamFlix</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-2">
        <h1 className="text-white font-semibold text-xl mt-8 mx-3  ">
          New Feeds
        </h1>
        <Link to='/trending'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4  "
        >
          Trending
          <i className=" mx-1 ri-fire-fill"></i>
        </Link>
        <Link to='/popular'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4"
        >
          Popular
          <i className=" mx-2 ri-bard-fill"></i>
        </Link>
        <Link to='/movies'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4"
        >
          Movies
          <i className="mx-2 ri-movie-2-fill"></i>
        </Link>
        <Link to='/tvshows'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4"
        >
          Tv Shows
          <i className=" mx-2 ri-tv-2-fill"></i>
        </Link>
        <Link to='/person'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4"
        >
          People
          <i className=" mx-2 ri-team-fill"></i>
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400"></hr>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white font-semibold text-xl mt-8  ">
          Website Info
        </h1>
        <Link to='/about'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4  "
        >
          About Us
          <i className=" mx-2 ri-information-fill"></i>
        </Link>
        <Link to='/contact'
          className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg 
                duration-300 p-4"
        >
          Contact Us
          <i className=" mx-2 ri-phone-fill"></i>
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
