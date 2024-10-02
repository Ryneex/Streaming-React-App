import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./Template/TopNav";
import DropDown from "./Template/DropDown"; // Import DropDown
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
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPerson([]);
    getPerson();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  useEffect(() => {
    document.title = "StreamFlix | People";
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1F1E24] overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row items-center justify-between p-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="text-[#6556Cd] ri-arrow-left-line cursor-pointer mr-2"
          ></i>
          People
        </h1>
        <div className="md:flex items-center gap-10 mt-4 md:mt-0 ">
          <TopNav />
          <DropDown
            title="Category"
            options={["popular", "top_rated", "upcoming"]}
            func={(e) => {
              setCategory(e.target.value);
              setPage(1); // Reset page when changing category
              setPerson([]); // Clear previous people
              getPerson(); // Fetch new people
            }}
          />
        </div>
      </div>
      <InfiniteScroll
        loader={<LoadingSpinner />}
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        endMessage={
          <p className="text-white text-center">No more people to show.</p>
        }
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  );
};

export default People;