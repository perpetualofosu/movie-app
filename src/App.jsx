import './i18n';
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
import { AuthProvider } from './AuthContext';
import VerificationPage from './VerificationPage';
import ProfileSettings from './ProfileSettings';
import { LanguageProvider } from './LanguageContext';
import MovieDetails from './MovieDetails';


function App() {
  return (
    <CategoryProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpCard />} />
              <Route path="/verify-email" element={<VerificationPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </CategoryProvider>
  );
}

export default App;
