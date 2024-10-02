import React, { useEffect, useState } from "react";
import SideNav from "./Template/SideNav";
import TopNav from "./Template/TopNav";
import axios from "../utils/axios";
import Header from "./Template/Header";
import HorizontalCards from "./Template/HorigontalCards"; // Assuming "HorizontalCards" is the correct name
import DropDown from "../Components/Template/DropDown";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const getWallpaperHeader = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      let randomData = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
    if (!wallpaper) {
      getWallpaperHeader();
    }
  }, [category]);

  document.title = "StreamFlix | Homepage";

  return wallpaper && trending.length > 0 ? (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar for larger screens */}
      <SideNav className="hidden md:block md:w-[20%] h-full" />

      {/* Main content area */}
      <div className="w-full md:w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav className="w-full" />

        {/* Header Section with the Wallpaper */}
        <Header data={wallpaper} />

        <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-xl md:text-2xl font-semibold mb-3 text-zinc-400">
            Trending
          </h1>

          {/* Filter Dropdown */}
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto"
          />
        </div>

        {/* Trending Cards Section */}
        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default Home;