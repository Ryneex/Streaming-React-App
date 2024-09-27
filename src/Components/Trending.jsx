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
    const [hasMore, setHasMore] = useState(true)

  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}?page=${page}`);
     if (data.results.length > 0)  {
         setTrending((prevState) => [...prevState, ...data.results])
         setPage(page + 1);
        }
     else {
         setHasMore(false)
        }
      
      
    } catch (error) {
      console.log(error);
    }
    };
    
    const refreshHandler = () => {
    if (trending.length===0) {
        getTrending()
        }
    else {
        setPage(1)
        setTrending([])
        getTrending()
        }
}

  useEffect(() => {
    refreshHandler()
  }, [duration, category]);
   document.title = "StreamFlix | Trending";
  return trending.length > 0 ? (
    <div className=" w-screen h-screen bg-[#1F1E24] overflow-x-hidden  ">
      <div className="w-full  flex items-center p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="text-[#6556Cd] ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <TopNav></TopNav>
        <DropDown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => {
            setCategory(e.target.value);
          }}
        ></DropDown>
        <div className="w-[2%]"></div>
        <DropDown
          title="Duration"
          options={["week", "day"]}
          func={(e) => {
            setDuration(e.target.value);
          }}
        ></DropDown>
      </div>
      <InfiniteScroll
        loader={<LoadingSpinner></LoadingSpinner>}
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
      >
        <Cards data={trending}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
};

export default Trending;
