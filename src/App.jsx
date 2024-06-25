import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage'; 
import ProfilePage from './Profile'; 
import './App.css'; 
import SignUpCard from './Signup';
import SearchResults from './SearchResults';
import WelcomePage from './Welcome';
import { CategoryProvider } from './CategoryContext';
import Login from './LoginPage';


function App() {
  return (
    <CategoryProvider>
    <Router>
      
      <Routes>
      <Route path="/Login" element={<Login/>} />
      <Route path="/Signup" element={<SignUpCard/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/welcome' element={<WelcomePage />} />
        


      </Routes>
    </Router>
    </CategoryProvider>
  );
}

export default App;
