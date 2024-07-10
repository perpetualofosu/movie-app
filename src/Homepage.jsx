import React from "react";
import CustomNavbar from "./Navbar";
import Hero from "./Hero";
import Row from "./Middle";
import requests from "./requests";
import { useCategory } from "./CategoryContext";

const HomePage = () => {
  const { category } = useCategory();

  const getFetchUrl = () => {
    switch (category) {
      case 'TV Shows':
        return requests.fetchTVShows;
      case 'Movies':
        return requests.fetchMovies;
      case 'Ratings':
        return requests.fetchRatings;  
      case 'Only On Popins':
        return requests.fetchAmazonMovies;
      case 'Browse by Language':
        return requests.fetchByLanguage;  
      default:
        return requests.fetchTrending;
    }
  };

  return (
    <div>
      <CustomNavbar />
      <Hero />
      <div className="movies">
        <div className="overflow-auto">
          <Row
            title={category || "POPINS ORIGINALS"}
            fetchUrl={getFetchUrl()}
            bigRow
          />
        </div>
        <div className="overflow-auto"><Row title="Trending Now" fetchUrl={requests.fetchTrending} /></div>
        <div className="overflow-auto"><Row title="Action Movies" fetchUrl={requests.fetchActionMovies} /></div>
        <div className="overflow-auto"><Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} /></div>
        <div className="overflow-auto"><Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} /></div>

      </div>
    </div>
  );
};

export default HomePage;


