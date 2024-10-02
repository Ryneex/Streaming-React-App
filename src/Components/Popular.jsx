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
        setPage((prevPage) => prevPage + 1); // Update page correctly
      } else {
        setHasMore(false); // No more results to fetch
      }
    } catch (error) {
      console.error("Error fetching popular data:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1); // Reset page number on refresh
    setPopular([]); // Clear previous results
    setHasMore(true); // Reset hasMore to true
    getPopular(); // Fetch new results
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  document.title = "StreamFlix | Popular";

  return (
    <div className="w-screen h-screen bg-[#1F1E24] overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556Cd] ri-arrow-left-line cursor-pointer mr-2"
          ></i>
          Popular
        </h1>
        <div className="md:flex items-center gap-10 mt-4 md:mt-0">
          <TopNav />
          <DropDown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => {
              setCategory(e.target.value);
              refreshHandler(); // Fetch new category results
            }}
          />
        </div>
      </div>
      {popular.length > 0 ? (
        <InfiniteScroll
          loader={<LoadingSpinner />}
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          endMessage={
            <p className="text-white text-center">No more popular items to show.</p>
          }
        >
          <Cards data={popular} title={category} />
        </InfiniteScroll>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Popular;