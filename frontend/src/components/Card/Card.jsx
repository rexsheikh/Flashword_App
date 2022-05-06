import './Card.css'
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")
 const [score,setScore] = useState(0);
 const [user, token] = useAuth();


 function handleDefClick(){
     setShowDef("show")
 }

 function handleScoreClick(){
     setScore(1);
     updateWordScore();
 }

//  path('update_word/<int:pk>/<int:scoreUpdate>', views.update_word)

 const updateWordScore = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/decks/updateScore/${props.parentDeck[0].words[0]}/${score}`,{
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