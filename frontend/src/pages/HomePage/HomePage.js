import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import DisplayCards from "../../components/DisplayCards/DisplayCards";
import Calendar from "../../components/Calendar/Calendar";
import AddDeck from "../../components/EditDecks/AddDeckModal";

const HomePage = () => {
  const [user, token] = useAuth();
  const [decks, setDecks] = useState([]);
  

  useEffect(() => {
    fetchDecks();
  }, [token],[decks]);


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
    <div style = {{backgroundColor:"#5F7161",border:"2px solid white",paddingTop:"2rem",height:"60vh"}}>
      <AddDeck/>
      <DisplayCards parentDecks = {decks}/>
      <Calendar parentDecks = {decks}/>
    </div>
  );}
};

export default HomePage;