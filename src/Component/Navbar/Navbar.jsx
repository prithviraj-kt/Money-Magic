import React from "react";
import "./Navbar.css";
import { useHistory, useParams } from "react-router-dom";
import logo from "./logo.jpg"
function Navbar() {
  const history = useHistory();
  const { id } = useParams();
  const goToHone = () => {
    history.push(`/all/${id}`);
  };
  const goToAddAmount = () => {
    history.push(`/add/${id}`);
  };
  const goToProfile = () => {
    history.push(`/profile/${id}`);
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="NavBar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 navbarTitle">
            <img src={logo} alt="" />
            <h2>Money Magic</h2>
          </div>
          <div className="col-8 navbarButtons">
            <button onClick={goToHone}>Home</button>
            <button onClick={goToAddAmount}>Add amount</button>
            <button onClick={() => handleLogoutClick()}>Log out</button>
            <button onClick={goToProfile}>Profile</button>
          </div>
        </div>
      </div>
      {/* <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a href="" className="navbar-brand">
          Money Magic
        </a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Profile
              </a>
              <div className="dropdown-menu">
                <a href="" className="dropdown-item">
                  Link 1
                </a>
                <a href="" className="dropdown-item">
                  Link 1
                </a>
                <a href="" className="dropdown-item">
                  Link 1
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav> */}
    </div>
  );
}

export default Navbar;
