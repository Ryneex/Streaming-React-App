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
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setMovies([]);
    getMovies();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  useEffect(() => {
    document.title = "StreamFlix | Movies";
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1F1E24] overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556Cd] ri-arrow-left-line cursor-pointer mr-2"
          ></i>
          Movie
          <small className="text-zinc-600 text-base ml-2">({category})</small>
        </h1>
        <div className="md:flex justify-between items-center gap-10 mt-4 md:mt-0 ml-5 ">
          <TopNav />
          <DropDown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        loader={<LoadingSpinner />}
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
        endMessage={
          <p className="text-white text-center">No more movies to show.</p>
        }
      >
        {movies.length > 0 ? (
          <Cards data={movies} title="movie" />
        ) : (
          <LoadingSpinner />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Movie;