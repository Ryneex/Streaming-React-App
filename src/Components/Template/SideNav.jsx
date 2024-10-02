import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger icon for small screens */}
      <div className="md:hidden flex justify-between items-center p-4 bg-[#6556CD]">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-white mr-2 ri-tv-fill"></i> StreamFlix
        </h1>
        <button onClick={toggleSidebar} className="text-white text-3xl">
          <i className="ri-menu-fill"></i>
        </button>
      </div>

      {/* Sidebar container */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative top-0 left-0 h-full w-[80%] md:w-[20%] bg-[#20232A] border-r-2 border-zinc-400 py-2 px-10 transition-transform duration-300 md:translate-x-0 z-50`}
      >
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] mr-2 ri-tv-fill"></i>
          <span>StreamFlix</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-2">
          <h1 className="text-white font-semibold text-xl mt-8 mx-3">
            New Feeds
          </h1>
          <Link
            to="/trending"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            Trending
            <i className="mx-1 ri-fire-fill"></i>
          </Link>
          <Link
            to="/popular"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            Popular
            <i className="mx-2 ri-bard-fill"></i>
          </Link>
          <Link
            to="/movies"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            Movies
            <i className="mx-2 ri-movie-2-fill"></i>
          </Link>
          <Link
            to="/tvshows"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            Tv Shows
            <i className="mx-2 ri-tv-2-fill"></i>
          </Link>
          <Link
            to="/person"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            People
            <i className="mx-2 ri-team-fill"></i>
          </Link>
        </nav>
        <hr className="border-none h-[1px] bg-zinc-400"></hr>
        <nav className="flex flex-col text-zinc-400 text-xl gap-2">
          <h1 className="text-white font-semibold text-xl mt-8">
            Website Info
          </h1>
          <Link
            to="/about"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            About Us
            <i className="mx-2 ri-information-fill"></i>
          </Link>
          <Link
            to="/contact"
            className="hover:bg-[#6556CD] hover:text-white hover:rounded-lg duration-300 p-4"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
            <i className="mx-2 ri-phone-fill"></i>
          </Link>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideNav;
