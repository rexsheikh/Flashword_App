import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import DeckCard from "../../components/DeckCard/DeckCard";
import MainModal from "../../components/Modal/Modal";
import DisplayCards from "../../components/DisplayCards/DisplayCards";
import Calendar from "../../components/Calendar/Calendar";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [decks, setDecks] = useState([]);
  

  useEffect(() => {
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
    } catch (error) {
      console.log(error.message)
    }
  }


  
  if(decks.length == 0){
    return(
      <div> decks loading... </div>
    )
  }else{
  return (
    <div style = {{backgroundColor:"#5F7161",border:"2px solid white",paddingTop:"2rem",height:"50vh"}}>
      <DisplayCards parentDecks = {decks}/>
      <Calendar parentDecks = {decks}/>
    </div>
  );}
};

export default HomePage;