import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovies } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import HorigontalCard from "./Template/HorigontalCards";
const MovieDetail = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovies());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.6)),
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full max-w-[100vw]   h-auto px-[10%] relative  "
    >
      <nav className="w-full h-[10vh] text-zinc-100 flex gap-10 items-center text-xl ">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      <div className="md:flex  w-full mt-4 ">
        <img
          className="  mb:h-[50vh] h-[40vh]   md:h-[50vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.9)] rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path || info.detail.poster_path
          }`}
          alt=""
        />
        <div className="ml-[5%] text-white ">
          <h1 className="md:text-5xl font-black mb-2  ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <span className="md:text-xl md:font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="md:flex  md:items-center md:gap-x-5 md:mt-3 md:mb-5  ">
            <span className="text-white  w-[6vh]  h-[6vh] text-xl flex justify-center items-center bg-yellow-600 rounded-full">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold md:text-2xl w-[50px] leading-6 mb-2">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {" "}
            {info.detail.tagline}
          </h1>

          <h1 className="mb:text-2xl text-sm mb-2 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="mb:text-2xl mb-2 mt-5">languages</h1>
          <p className="mb-10">{info.translations.join(" , ")}</p>

          <Link
            className=" mb:p-5 p-2 md:ml-[40%]  bg-[#6556cd] rounded-lg font-semibold mb-2 "
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-large-fill"></i> Play Trailer
          </Link>
        </div>
      </div>

      <div>
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="text-white flex  gap-x-5 items-center mt-4">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="md:w-[6vh] md:h-[6vh] w-[3vh] h-[3vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              ></img>
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="text-white flex  gap-x-5 items-center mt-4">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="md:w-[6vh] md:h-[6vh] w-[3vh] h-[3vh] object-cover rounded-md gap-2 "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              ></img>
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="text-white flex gap-x-5 items-center mt-4">
            <h1>Available for buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="md:w-[6vh] md:h-[6vh] w-[3vh] h-[3vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              ></img>
            ))}
          </div>
        )}
      </div>

      <hr className="mt-10 mb-10 border-none h-[2px] bg-zinc-500" />

      <h1 className=" mb-8 ml-5 text-3xl font-bold text-white">
        Recommendations & Similar Stuff{" "}
      </h1>
      <HorigontalCard
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      ></HorigontalCard>
      <Outlet></Outlet>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
};

export default MovieDetail;
