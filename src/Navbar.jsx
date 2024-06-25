import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useCategory } from './CategoryContext';

export default function CustomNavbar() {
  const [staticnav, setNavbar] = useState("navbar-transparent");
  const [query, setQuery] = useState("");
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

  const handleRecomClick = () => {
    navigate('/search');
  };

  return (
    <nav className={`navbar fixed-top ${staticnav}`}>
      <div className="container">
        <div className="navbar-left">
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
                  Poppins
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
                  <button className="dropdown-item" onClick={() => handleCategoryClick('My List')}>
                    Only on Poppins
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <a className="navbar-brand" href="#">
            Poppins
          </a>
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
          <div className="dropdown">
            <button
              className="btn"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-bell"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              coming soon
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn recom"
              type="button"
              id="dropdownMenuButton2"
              onClick={handleRecomClick} 
              aria-expanded="false"
            >
              🤷🏼‍♀️
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
