import React from "react";
import { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./NavBar.css";


// Key (Dictionary):
// 939c6c16-c538-4b7c-8ee9-f01f9725a621
// Key (Thesaurus):
// ea9d4b59-071f-4c46-b692-47b3f4b4c127

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const[query,setQuery] = useState('')
  const[word,setWord] = useState('')
  console.log(query)
  
  const handleSearch = () =>{
    getWebsterWord();
  }
  const getWebsterWord = async () =>{
    try {
      let response = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=939c6c16-c538-4b7c-8ee9-f01f9725a621`
      );
      setWord(response.data);
      console.log(`WEBSTER RESPONSE: ${word}`)
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Flashword</b>
          </Link>
        </li>
        <li>
          <input type = "text"
          onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" onClick = {handleSearch}>submit</button>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
