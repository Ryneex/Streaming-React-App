import React, { useEffect } from "react";
import SideNav from "./Template/SideNav";
import TopNav from "./Template/TopNav";
import { useState } from "react";
import axios from "../utils/axios";
import Header from "./Template/Header";
import HorigontalCards from "./Template/HorigontalCards";
import DropDown from "../Components/Template/DropDown";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const getWallpaperHeader = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
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
    !wallpaper && getWallpaperHeader();
  }, [category]);

  document.title = "StreamFlix | Homepage";

  return wallpaper && trending ? (
    <>
      <SideNav></SideNav>
      <div className=" w-[100%] h-full overflow-auto overflow-x-hidden">
        <TopNav></TopNav>

        <Header data={wallpaper}></Header>

        <div className="p-5 flex justify-between">
          <h1
            className="text-2xl font-semibold mb-3
       text-zinc-400"
          >
            Trending
          </h1>
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          ></DropDown>
        </div>
        <HorigontalCards data={trending}></HorigontalCards>
      </div>
    </>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
};

export default Home;
