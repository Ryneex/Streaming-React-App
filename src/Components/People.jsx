import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Template/TopNav";
import axios from "../utils/axios";
import Cards from "./Template/Cards";
import LoadingSpinner from "../Components/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
   const [person, setPerson] = useState([]);
   const [category, setCategory] = useState("popular");
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const navigate = useNavigate();

   const getPerson = async () => {
     try {
       const { data } = await axios.get(`/person/${category}?page=${page}`);
       if (data.results.length > 0) {
         setPerson((prevState) => [...prevState, ...data.results]);
         setPage(page + 1);
       } else {
         setHasMore(false);
       }
     } catch (error) {
       console.log(error);
     }
   };
   const refreshHandler = () => {
     if (person.length === 0) {
       getPerson();
     } else {
       setPage(1);
       setPerson([]);
       getPerson();
     }
   };

   useEffect(() => {
     refreshHandler();
   }, [category]);

   document.title = "StreamFlix | People";

  return person.length > 0 ? (
    <div className=" w-screen h-screen bg-[#1F1E24] overflow-x-hidden  ">
      <div className="w-full  flex items-center p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="text-[#6556Cd] ri-arrow-left-line "
          ></i>
          People
          
        </h1>
        <TopNav></TopNav>
      
      </div>
      <InfiniteScroll
        loader={<LoadingSpinner></LoadingSpinner>}
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
      >
        <Cards data={person}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
};

export default People;
