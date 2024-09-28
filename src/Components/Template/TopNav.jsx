import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import no_img from '../../assets/no_img.png'

const TopNav = () => {
    const [queries, setQueries] = useState("")
    const [searchs, setSearchs]= useState([])
    

      const getSearches = async () => {
          try {
              const { data } = await axios.get(`search/multi?query=${queries}`)
              
              setSearchs(data.results)
              
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
         getSearches()
     },[queries])
  return (
    <div className="w-full h-[7vh]  relative flex justify-start items-center mx-[15%] z-[9999] ">
      <i className=" text-zinc-400 text-2xl ri-search-line"></i>
      <input
        onChange={(e) => {
          setQueries(e.target.value);
        }}
        value={queries}
        className="w-[50%] text-zinc-200 mx-10 p-4 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search..."
      ></input>
      {queries.length > 0 && (
        <i
          onClick={() => {
            setQueries("");
          }}
          className=" text-zinc-400 text-2xl ri-close-line"
        ></i>
      )}

      <div className="w-[65%] max-h-[50vh] bg-zinc-200 absolute top-[100%] left-[5%] overflow-auto rounded ">
        {searchs.map((s, i) => (
          <Link
            key={i}
            className="text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 w-full 
        p-5 flex items-center justify-start border-b-2 border-zinc-100  "
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : no_img
              }
            ></img>
            <span>
              {s.title || s.name || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
