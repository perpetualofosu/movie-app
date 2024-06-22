import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage'; 
import LoginPage from './Login'; 
import './App.css'; 
import SignUpCard from './Signup';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Signup" element={<SignUpCard/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
