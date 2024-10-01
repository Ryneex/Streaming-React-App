
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

import HorigontalCards from "./Template/HorigontalCards";
import DropDown from "./Template/DropDown";
const PersonDetail = () => {
 
  const [category, setcategory]= useState("movie")
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="w-screen px-[8%] h-[250vh] bg-[#1f1e24]">
      {/* {part1 nav} */}
      <nav className="w-full h-[10vh] text-zinc-100 flex gap-10 items-center text-xl ">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* part2 */}
        <div className="w-[20%]">
          <img
            className="h-[40vh] w-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.9)] rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-10 border-none h-[2px] bg-zinc-500" />
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Known for</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.detail.gender === 2 ? "male" : "female"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.detail.birthday}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.detail.place_of_birth}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.detail.also_known_as.join(",")}
          </h1>
        </div>
        {/* part-3 */}
        <div className="w-[80%] ml-[5%]">
          <h1 className=" text-zinc-400 font-black text-6xl my-5 ">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold mt-3">
            Biography
          </h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Well Known For
          </h1>
          <HorigontalCards data={info.combinedcredits.cast}></HorigontalCards>
          <div className="w-full flex justify-between">
            <h1 className="text-xl text-zinc-400 font-semibold mt-3">Acting</h1>
            <DropDown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            ></DropDown>
          </div>
          <div className=" list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl mt-5 shadow-[rgba(255,255,255,.5)] border-2 border-zinc-700 p-5">
            {info[category + "credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white  hover:bg-[#19191d] duration-300 cursor-pointer p-5">
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className="ml-5 block mt-2 ">{ c.character && `Character Name : ${ c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
}

export default PersonDetail