import './Card.css'
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")
 const [score,setScore] = useState(0);
 const [user, token] = useAuth();
 let word = 'river'


 function handleDefClick(){
     setShowDef("show")
 }

 function handleScoreClick(){
     updateWordScore();
 }


 const updateWordScore = async () => {
   let body = {
     score: 10
   };
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/decks/update_word/${word}/`,
        body,
        {
        headers: {
          Authorization: "Bearer " + token
        },
      });
    } catch (error) {
      console.log(error.message)
    }
  }
  

    return (  
        <div className="card">
            <h1>{props.parentDeck[0].title}</h1>
            <h2> {props.parentDeck[0].words[0].word}</h2>
            <div>
                <button onClick = {handleDefClick}> Show Definition</button>
            </div>
            <p className={showDef}> {props.parentDeck[0].words[0].definition}</p>
            <div> 
             <button onClick = {handleScoreClick} > Score </button>  
            </div>
        </div>
    );
}
 
export default DeckCard;