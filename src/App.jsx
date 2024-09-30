import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import Tvshows from "./Components/Tvshows";
import People from "./Components/People";
import About from "./Components/About";
import Contact from "./Components/Contact";
import MovieDetail from "./Components/MovieDetail";
import TvDetails from "./Components/TvDetails";
import PersonDetail from "./Components/PersonDetail";
import Trailer from "./Components/Template/Trailer";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24]  flex">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/trending" element={<Trending></Trending>}></Route>
        <Route path="/popular" element={<Popular></Popular>}></Route>
        <Route path="/movies" element={<Movie></Movie>}></Route>
        <Route path="/movie/details/:id" element={<MovieDetail></MovieDetail>}>
          <Route
            path="/movie/details/:id/trailer"
            element={<Trailer></Trailer>}
          ></Route>
        </Route>

        <Route path="/tvshows" element={<Tvshows />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails></TvDetails>}>
          <Route
            path="/tv/details/:id/trailer"
            element={<Trailer></Trailer>}
          ></Route>
        </Route>
        <Route path="/person" element={<People />}></Route>
        <Route
          path="/person/details/:id"
          element={<PersonDetail></PersonDetail>}
        ></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact>`</Contact>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
};

export default App;
