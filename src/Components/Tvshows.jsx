import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Template/TopNav";
import DropDown from "./Template/DropDown";
import axios from "../utils/axios";
import Cards from "./Template/Cards";
import LoadingSpinner from "../Components/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Tvshows = () => {
     const [tv, setTv] = useState([]);
     const [category, setCategory] = useState("airing_today");
     const [page, setPage] = useState(1);
     const [hasMore, setHasMore] = useState(true);
     const navigate = useNavigate();

     const getTv = async () => {
       try {
         const { data } = await axios.get(`/tv/${category}?page=${page}`);
         if (data.results.length > 0) {
           setTv((prevState) => [...prevState, ...data.results]);
           setPage(page + 1);
``         } else {
           setHasMore(false);
         }
       } catch (error) {
         console.log(error);
       }
     };
     const refreshHandler = () => {
       if (tv.length === 0) {
         getTv();
       } else {
         setPage(1);
         setTv([]);
         getTv();
       }
     };

     useEffect(() => {
       refreshHandler();
     }, [category]);

     document.title = "StreamFlix | Tv Shows";



   return tv.length > 0 ? (
     <div id="scroller" className=" w-screen h-screen bg-[#1F1E24] overflow-x-hidden  ">
       <div className="w-full  md:flex items-center p-5 mb:-p-10">
         <h1 className="text-2xl text-zinc-400 font-semibold ">
           <i
             onClick={() => {
               navigate(-1);
             }}
             className="text-[#6556Cd] ri-arrow-left-line"
           ></i>
           Tv
           <small className="text-zinc-600 text-base ml-2">({category})</small>
         </h1>
         <div className="md:flex md:gap-[10%] md:ml-[20%] ">
           <TopNav></TopNav>
           <DropDown
             title="Category"
             options={["popular", "top_rated", "on_the_air", "airing_today"]}
             func={(e) => {
               setCategory(e.target.value);
             }}
           ></DropDown>
         </div>
       </div>
       <InfiniteScroll
         loader={<LoadingSpinner></LoadingSpinner>}
         dataLength={tv.length}
         next={getTv}
         hasMore={hasMore}
         scrollableTarget="scroller"
       >
         <Cards data={tv} title="tv"></Cards>
       </InfiniteScroll>
     </div>
   ) : (
     <LoadingSpinner></LoadingSpinner>
   );
};

export default Tvshows;
