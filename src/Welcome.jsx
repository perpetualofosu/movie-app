import React from 'react';
import { Link } from 'react-router-dom'; 
import './welcome.css';

const Welcome = () => {

  return (
    <div className='blur'>
      <div className="wel-container">
        <div className='word'>
          <h1>Discover Popins - Your <br />Ultimate Movie Destination</h1>
          <p>Unlock a world of cinematic delight with Popins, the premier movie streaming site that offers an unbeatable selection at an affordable price. Dive in and enjoy your favorite films in style. Welcome!!</p>
        </div>
       
        <div className="wel-buttons">
          <Link to="/signup" className="button-link">
            <button id='button-sign'>Sign up</button>
          </Link>
          <Link to="/login" className="button-link">
            <button id='button'>Login</button>
          </Link>
        </div>
      </div>
      
      <div className='bottom'>
        <h2>An Unparalleled Movie Selection</h2>
        <div className='column'>
          <div className="first">
            <h3>Classics</h3>
            <p>Indulge in timeless favorites that have stood the test of time, from beloved black-and-white films to iconic blockbusters.</p>
          </div>
          <div className="second">
            <h3>New Releases</h3>
            <p>Stay ahead of the curve and be the first to experience the latest cinematic masterpieces fresh from the silver screen.</p>
          </div>
          <div className="third">
            <h3>Diverse Genre</h3>
            <p>Explore a vast library spanning every genre, from heart-pounding action to thought-provoking documentaries and beyond.</p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Welcome;
