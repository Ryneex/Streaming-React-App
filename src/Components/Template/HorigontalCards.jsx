import React from "react";
import { Link } from "react-router-dom";


const HorigontalCards = ({ data, }) => {
  return (
   
     
      <div className="w-[100%] h-[50vh] flex overflow-y-hidden mb-5 p-5 ">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[16%]  mr-5 bg-zinc-900 mb-5 rounded-md overflow-hidden "
          >
            <img
              className="w-full h-[55%] object-cover "
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.profile_path
              }`}
              alt=""
            />
            <div className="text-white p-3 h-[45%] w-full  ">
              <h1 className=" text-xl h-8 font-semibold mb-1 overflow-hidden  ">
                {d.name || d.original_name || d.original_title || d.title}
              </h1>
              <p className="text-sm">
                {d.overview.slice(0, 45)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    
  );
};

export default HorigontalCards;
