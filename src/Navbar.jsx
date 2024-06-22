import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function CustomNavbar() {
  const [staticnav, setNavbar] = useState("navbar-transparent");

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

  return (
    <nav className={`navbar fixed-top ${staticnav} `}>
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
            className="offcanvas offcanvas-start"
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
                  <a className="dropdown-item" href="#">
                    TV Shows
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Movies
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Latest
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    My List
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Browse by Language
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <a className="navbar-brand" href="#">
            Poppins
          </a>
        </div>
        <div className="navbar-right">
          <div className="search-container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </div>
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
              className="btn "
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
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
