import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useCategory } from './CategoryContext';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function CustomNavbar() {
  const [staticnav, setNavbar] = useState("navbar-transparent");
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const { setCategory } = useCategory();

  const changeNavbarBg = () => {
    if (window.scrollY >= 80) {
      setNavbar("navbar-dark");
    } else {
      setNavbar("navbar-transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarBg);
    return () => {
      window.removeEventListener("scroll", changeNavbarBg);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch full name from local storage or Firestore
        const storedFullName = localStorage.getItem('fullName');
        if (storedFullName) {
          setFullName(storedFullName);
        } else {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setFullName(userDoc.data().fullName);
          }
        }
        // Fetch avatar from local storage
        const storedAvatar = localStorage.getItem('selectedAvatar');
        if (storedAvatar) {
          setAvatar(storedAvatar);
        }
      } else {
        setUser(null);
        setAvatar('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    navigate('/');
  };

  const handleAvatarClick = () => {
    navigate('/profile-settings');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('fullName'); 
      localStorage.removeItem('selectedAvatar'); 
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={`navbar fixed-top ${staticnav}`}>
      <div className="container">
        <div className="navbar-left">
          <a className="navbar-brand glass" href="#">
            Popins
          </a>
          <button
            className="btn btn-secondary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>

          <div
            className="offcanvas offcanvas-start glass-card off-body"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                <a className="navbar-brand" href="#">
                  Popins
                </a>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="sidebarlist">
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('TV Shows')}>
                    TV Shows
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('Movies')}>
                    Movies
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('Latest')}>
                    Ratings
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('Browse by Language')}>
                    Browse by Language
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('Only On Popins')}>
                    Only on Popins
                  </button>
                </li>
              </ul>
              <div className="logout d-flex align-items-center justify-content-center">
                {user && (
                  <>
                    <span className="me-2">{fullName}</span>
                    <img
                      src={avatar || 'default_profile_picture_url_here'}
                      alt="User Avatar"
                      className="user-avatar me-2"
                      onClick={handleAvatarClick}
                    />
                  </>
                )}
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-right">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
