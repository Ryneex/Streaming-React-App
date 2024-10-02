import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import HorigontalCards from "./Template/HorigontalCards";
import DropDown from "./Template/DropDown";

const PersonDetail = () => {
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  if (!info) {
    return <LoadingSpinner />;
  }

  const {
    detail: {
      profile_path,
      name,
      biography,
      known_for_department = "N/A",
      gender,
      birthday,
      place_of_birth,
      also_known_as,
    },
    combinedcredits,
    externalid,
  } = info;

  return (
    <div className="w-screen px-4 md:px-8 lg:px-12 bg-[#1f1e24]">
      {/* Navigation */}
      <nav className="w-full h-10 text-zinc-100 flex items-center text-xl">
        <Link onClick={() => navigate(-1)} className="ri-arrow-left-line"></Link>
      </nav>

      <div className="flex flex-col md:flex-row mt-5">
        {/* Left Column: Profile Information */}
        <div className="w-full md:w-1/3">
          <img
            className="h-60 w-full object-cover shadow-lg rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${profile_path || 'default-profile.png'}`} // Fallback image
            alt={name} // Descriptive alt text
          />
          <hr className="my-5 border-none h-[2px] bg-zinc-500" />
          <div className="text-2xl text-white flex gap-4">
            {Object.entries(externalid).map(([key, value]) => (
              value && (
                <a key={key} target="_blank" rel="noopener noreferrer" href={`https://${key}.com/${value}`}>
                  <i className={`ri-${key}-fill`}></i>
                </a>
              )
            ))}
          </div>
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">Person Info</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known for</h1>
          <h1 className="text-zinc-400 font-semibold">{known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400 font-semibold">{gender === 2 ? "Male" : gender === 1 ? "Female" : "Not Specified"}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400 font-semibold">{birthday || "N/A"}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Place of Birth</h1>
          <h1 className="text-zinc-400 font-semibold">{place_of_birth || "N/A"}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Also Known As</h1>
          <h1 className="text-zinc-400 font-semibold">{also_known_as.length > 0 ? also_known_as.join(", ") : "N/A"}</h1>
        </div>

        {/* Right Column: Biography and Filmography */}
        <div className="w-full md:w-2/3 md:ml-5">
          <h1 className="text-zinc-400 font-black text-4xl md:text-6xl my-5">{name}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold mt-3">Biography</h1>
          <p className="text-zinc-400 mt-3">{biography || "Biography not available."}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Well Known For</h1>
          <HorigontalCards data={combinedcredits.cast} />
          <div className="flex justify-between mt-5">
            <h1 className="text-xl text-zinc-400 font-semibold">Acting</h1>
            <DropDown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl mt-5 border-2 border-zinc-700 p-5">
            {info[`${category}credits`].cast.map((c, i) => (
              <li key={i} className="hover:text-white hover:bg-[#19191d] duration-300 cursor-pointer p-5">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className="ml-5 block mt-2">{c.character && `Character Name: ${c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;