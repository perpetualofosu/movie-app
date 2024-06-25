import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage'; 
import LoginPage from './Login'; 
import './App.css'; 
import SignUpCard from './Signup';
import SearchResults from './SearchResults';
import WelcomePage from './Welcome';
import { CategoryProvider } from './CategoryContext';

function App() {
  return (
    <CategoryProvider>
    <Router>
      
      <Routes>
      <Route path="/Signup" element={<SignUpCard/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/welcome' element={<WelcomePage />} />
        


      </Routes>
    </Router>
    </CategoryProvider>
  );
}

export default App;
