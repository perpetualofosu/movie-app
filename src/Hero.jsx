import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Hero.css'; 
import axios from './axios';
import requests from './requests';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const [movie, setMovie] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    fetchMovie();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  const handleMoreInfoClick = () => {
    navigate(`/movie/${movie.id}`); 
  };

  return (
    <div 
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "top center",
      }}
    >
      <div className="Movie-info">
        <div className="title">
          <h2>{movie?.title || movie?.name || movie?.original_name}</h2>
        </div>
        <div className="info">
          <p>{truncate(movie?.overview, 150)}</p>
        </div>
        <div className="buttons">
          <button className="play"><i className="bi bi-play-fill"></i>Play</button>
          <button className="more" onClick={handleMoreInfoClick}><i className="bi bi-info-circle-fill"></i>More Info</button>
        </div>
        
      </div>
      <div className="fade"></div>
    </div>
  );
}

export default Hero;
