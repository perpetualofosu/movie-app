import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './welcome.css'; // Import the CSS file for styling

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Poppins World</h1>
        <p className="welcome-description">Discover and explore the world of movies. Sign up or log in to get started!</p>
        <div className="welcome-buttons">
          <button className="btn btn-primary welcome-btn" onClick={handleSignUp}>Sign Up</button>
          <button className="btn btn-secondary welcome-btn" onClick={handleLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
