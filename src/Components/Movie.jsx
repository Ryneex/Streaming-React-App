import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Template/TopNav";
import DropDown from "./Template/DropDown";
import axios from "../utils/axios";
import Cards from "./Template/Cards";
import LoadingSpinner from "../Components/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
 const [movies, setMovies] = useState([]);
 const [category, setCategory] = useState("now_playing");
 const [page, setPage] = useState(1);
 const [hasMore, setHasMore] = useState(true);
 const navigate = useNavigate();

const getMovies = async () => {
  try {
    const { data } = await axios.get(`/movie/${category}?page=${page}`);
    if (data.results.length > 0) {
      setMovies((prevState) => [...prevState, ...data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.log(error);
  }
};
const refreshHandler = () => {
  if (movies.length === 0) {
    getMovies();
  } else {
    setPage(1);
    setMovies([]);
    getMovies();
  }
};

useEffect(() => {
  refreshHandler();
}, [category]);

document.title = "StreamFlix | Movies";



  return movies.length > 0 ? (
    <div className=" w-screen h-screen bg-[#1F1E24] overflow-x-hidden  ">
      <div className="w-full  flex items-center p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="text-[#6556Cd] ri-arrow-left-line"
          ></i>
          Movie<small className="text-zinc-600 text-base ml-2">({category})</small>
        </h1>
        <TopNav></TopNav>
        <DropDown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => {
            setCategory(e.target.value);
          }}
        ></DropDown>
      </div>
      <InfiniteScroll
        loader={<LoadingSpinner></LoadingSpinner>}
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
      >
        <Cards data={movies}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
};

export default Movie;
