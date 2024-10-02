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
    <div className="min-h-screen bg-[#1F1E24] flex flex-col">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/movie/details/:id" element={<MovieDetail />}>
            <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          </Route>
          <Route path="/tvshows" element={<Tvshows />} />
          <Route path="/tv/details/:id" element={<TvDetails />}>
            <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          </Route>
          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<PersonDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
