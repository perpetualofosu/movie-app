import React from "react";
import CustomNavbar from "./Navbar";
import Hero from "./Hero";
import Row from "./Middle";
import requests from "./requests";

const HomePage = () => {
  return (
    <div>
      <CustomNavbar />
      <Hero />
      <div className="movies">
        <div className="overflow-auto">
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
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
