import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from './axios';
import './middle.css';
import { useTranslation } from 'react-i18next';

const Row = ({ title, fetchUrl, bigRow = false }) => {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results || []);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setMovies([]);
            }
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="movies">
                <div className="row__posters">
                    {movies.map(movie => (
                        (movie.poster_path || movie.backdrop_path) && (
                            <div
                                className={`row__poster ${bigRow ? "row__posterLarge" : ""}`}
                                key={movie.id}
                            >
                                <img
                                    src={`${base_url}${bigRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name || movie.title}
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
        </div>
    );
};

export default Row;
