import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './middle.css';

const API_KEY = 'eab615197efa946b7ae33af6c2ce1b61';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState({});
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
          const movies = response.data.results;
          setMovies(movies);

          const similarMoviesPromises = movies.map(movie => 
            axios.get(`${BASE_URL}/movie/${movie.id}/similar?api_key=${API_KEY}`)
          );

          const similarMoviesResponses = await Promise.all(similarMoviesPromises);
          const similarMoviesData = movies.reduce((acc, movie, idx) => {
            acc[movie.id] = similarMoviesResponses[idx].data.results;
            return acc;
          }, {});

          setSimilarMovies(similarMoviesData);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };
    
    fetchData();
  }, [query]);

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <h2>Search Results</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            (movie.poster_path || movie.backdrop_path) && (
              <div
                className={`row__poster ${movie.poster_path ? "row__posterLarge" : ""}`}
                key={movie.id}
              >
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="row__overlay">
                  <h3>{movie.title || movie.name}</h3>
                  <p>{movie.overview}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {Object.keys(similarMovies).length > 0 && (
        <div className="mt-4">
          <h2>Similar Movies You Might Like</h2>
          {Object.keys(similarMovies).map((movieId) => (
            <div key={movieId} className="mb-4">
              <h3>Based on "{movies.find(movie => movie.id === parseInt(movieId))?.title}"</h3>
              <div className="row__posters">
                {similarMovies[movieId].map((movie) => (
                  (movie.poster_path || movie.backdrop_path) && (
                    <div
                      className={`row__poster ${movie.poster_path ? "row__posterLarge" : ""}`}
                      key={movie.id}
                    >
                      <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title || movie.name}
                      />
                      <div className="row__overlay">
                        <h3>{movie.title || movie.name}</h3>
                        <p>Rating: {movie.vote_average}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
