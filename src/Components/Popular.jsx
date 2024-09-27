
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Template/TopNav";
import DropDown from "./Template/DropDown";
import axios from "../utils/axios";
import Cards from "./Template/Cards";
import LoadingSpinner from "../Components/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";


  

const Popular = () => {
    const [popular, setPopular] = useState([]);
    const [category, setCategory] = useState("movie");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();


    const getPopular = async () => {
      try {
        const { data } = await axios.get(`${category}/popular?page=${page}`);
        if (data.results.length > 0) {
          setPopular((prevState) => [...prevState, ...data.results]);
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
     const refreshHandler = () => {
       if (popular.length === 0) {
         getPopular();
       } else {
         setPage(1);
         setPopular([]);
         getPopular();
       }
    };
    

 useEffect(() => {
   refreshHandler();
 }, [ category]);

document.title = "StreamFlix | Popular";
  return popular.length > 0 ? (
    <div className=" w-screen h-screen bg-[#1F1E24] overflow-x-hidden  ">
      <div className="w-full  flex items-center p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="text-[#6556Cd] ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <TopNav></TopNav>
        <DropDown
          title="Category"
          options={["movie", "tv"]}
          func={(e) => {
            setCategory(e.target.value);
          }}
        ></DropDown>
        
       
      </div>
      <InfiniteScroll
        loader={<LoadingSpinner></LoadingSpinner>}
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
      >
        <Cards data={popular}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
}

export default Popular