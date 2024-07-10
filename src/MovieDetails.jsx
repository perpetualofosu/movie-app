import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details.');
      }
    }

    async function fetchMovieCast() {
      try {
        const response = await axios.get(`/movie/${id}/credits`);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
        setError('Error fetching movie cast.');
      }
    }

    fetchMovieDetails();
    fetchMovieCast();
  }, [id, apiKey]);

  if (error) {
    return <div className="movie-details"><h2>{error}</h2></div>;
  }

  return (
    <div className="movie-details "style={{height: '100vh'}}>
      <h1>{movie.title || movie.name || movie.original_name}</h1>
      <p>{movie.overview}</p>
      <h3>Cast</h3>
      <ul style={{ display: 'flex', overflowX: 'auto' }}>
        {cast.map((actor) => (
          <li className="actor-card" key={actor.id}>
            <img className="actor-image" src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
            <div className="actor-details">
              <h4>{actor.name}</h4>
              <p>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
