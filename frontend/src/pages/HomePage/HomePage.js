import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DeckCard from "../../components/DeckCard/DeckCard";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCars();
    fetchDecks();
  }, [token]);

  const fetchDecks = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/decks/",{
        headers: {
          Authorization: "Bearer " + token
        },
      });
      setDecks(response.data);
      console.log(`DECKS: ${decks}`)
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="container">
      <p> {decks[0].words[0].word}</p>
    </div>
  );
};

export default HomePage;