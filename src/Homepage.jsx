import React from 'react';
import CustomNavbar from './Navbar';
import Hero from './Hero';
import Row from './Middle';
import requests from './requests';

const HomePage = () => {
  return (
    <div>
      <CustomNavbar />
      <Hero />
      <Row
      title="NETFLIX ORIGINALS" 
      fetchUrl ={requests.fetchNetflixOriginals}
      bigRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title ="Romance Movies" fetchUrl={requests.fetchRomance}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
   
      
      

    </div>
  );
};

export default HomePage;
