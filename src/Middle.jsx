import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from './axios';
import requests from './requests';


const Row = ({ title, fetchUrl, bigRow = false })=>{
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl])

    return(
        <div className={`row ${bigRow && "bigRow"}`}>
            <h2>{title}</h2>
    
                {movies.map(movie => (
                    <img src={`${base_url}${
                        bigRow ? movie.poster_path : movie.backdrop_path
                        }`} alt={movie.name} key={movie.id} />
                    ))}
                    
                    
                    
            </div>
    )



}
export default Row; 