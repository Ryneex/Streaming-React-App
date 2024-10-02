import React from "react";
import { Link } from "react-router-dom";
import no_img from "../../assets/no_img.png";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-between w-full px-2">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] mb-4 md:mb-8 relative p-2" // Adjusted widths for responsiveness
          key={i}
        >
          <img
            className="h-[40vh] w-full  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.9)] rounded-lg"
            src={
              c.poster_path ||
              c.backdrop_path ||
              c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : no_img
            }
            alt=""
          />
          <h1 className="md:text-xl text-zinc-400 mt-3 w-full font-semibold text-center ">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="text-white absolute left-[90%] bottom-[50%] md:left-[88%] 
            md:bottom-[30%] w-[5.5vh] h-[5.5vh] text-xl flex justify-center items-center
             bg-yellow-600 rounded-full">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;