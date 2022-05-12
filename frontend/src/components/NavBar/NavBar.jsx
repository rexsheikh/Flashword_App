import React from "react";
import { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b style = {{fontFamily: "Roboto Mono, monospace",fontSize:"50px"}}>Fl</b>
            <img style = {{marginBottom:"35px"}} src = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Latin_lowercase_alpha.svg'></img>
            <b style = {{fontFamily: "Roboto Mono, monospace",fontSize:"50px"}}>shWord</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button style = {{backgroundColor:"#6D8B74", borderRadius:"20px", border:"10px", fontFamily: "Roboto Mono, monospace", marginTop:"17px"}} onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
