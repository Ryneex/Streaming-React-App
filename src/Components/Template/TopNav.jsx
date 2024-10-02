import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import no_img from '../../assets/no_img.png';

const TopNav = () => {
  const [queries, setQueries] = useState("");
  const [searchs, setSearchs] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${queries}`);
      setSearchs(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [queries]);

  return (
    <div className="w-full h-[7vh] relative flex justify-between mb-2 items-center px-4 md:px-[15%] z-[9999] bg-gray-800">
      <div className="flex items-center">
        <i className="text-zinc-400 text-2xl ri-search-line"></i>
        <input
          onChange={(e) => {
            setQueries(e.target.value);
          }}
          value={queries}
          className="w-full md:w-[50%] text-zinc-200 mx-2 p-2 text-lg outline-none border-none bg-transparent"
          type="text"
          placeholder="Search..."
        />
        {queries.length > 0 && (
          <i
            onClick={() => {
              setQueries("");
            }}
            className="text-zinc-400 text-2xl ri-close-line cursor-pointer"
          ></i>
        )}
      </div>

      {queries.length > 0 && (
        <div className="w-full md:w-[65%] max-h-[50vh] bg-white absolute top-full left-0 overflow-auto rounded shadow-lg">
          {searchs.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="text-zinc-600 font-semibold hover:text-black hover:bg-gray-300 w-full p-4 flex items-center justify-start border-b border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-3 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                    : no_img
                }
                alt={s.title || s.name || "Image not available"}
              />
              <span>
                {s.title || s.name || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;