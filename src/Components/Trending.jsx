import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Template/TopNav";
import DropDown from "./Template/DropDown";
import axios from "../utils/axios";
import Cards from "./Template/Cards";
import LoadingSpinner from "../Components/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1); // Ensure the page number increments correctly
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1); // Reset the page number
    setTrending([]); // Clear previous results
    setHasMore(true); // Reset hasMore to true for new fetch
    getTrending(); // Fetch new trending data
  };

  useEffect(() => {
    refreshHandler();
  }, [duration, category]); // Refetch data whenever duration or category changes

  document.title = "StreamFlix | Trending";

  return (
    <div className="w-screen h-screen bg-[#1F1E24] overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556Cd] ri-arrow-left-line cursor-pointer mr-2"
          ></i>
          Trending
        </h1>
        <div className="md:flex items-center gap-10 mt-4 md:mt-0">
          <TopNav />
          <DropDown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      {trending.length > 0 ? (
        <InfiniteScroll
          loader={<LoadingSpinner />}
          dataLength={trending.length}
          next={getTrending}
          hasMore={hasMore}
          endMessage={
            <p className="text-white text-center">No more trending items to show.</p>
          }
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Trending;