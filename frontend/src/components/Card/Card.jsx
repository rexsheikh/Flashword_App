import './Card.css'
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from 'react';

const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")
 const [score,setScore] = useState();
 const [user, token] = useAuth();
 const [word,setWord] = useState();


 useEffect(() => {
        getWord();
        // console.log(word.score)
    }, [])


 function handleDefClick(){
     setShowDef("show")
 }

function handleGoodClick(){
  setScore(word.score + 1)
  updateWordScore()
}
function handleBadClick(){
  setScore(word.score -1)
  updateWordScore()
}



 const updateWordScore = async () => {
   let body = {
     score: score
   };
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/decks/update_word/${word.word}/`,
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

  const getWord = async () =>{
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/decks/get_word/${props.parentDeck[0].words[0].word}/`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setWord(response.data);
    } catch (e) {
      console.log(e.message);
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
             <button onClick = {handleGoodClick} > Good </button>  
            </div>
            <div> 
             <button onClick = {handleBadClick} > Bad </button>  
            </div>
            <div> 
             <button> Neutral </button>  
            </div>
        </div>
    );
}
 
export default DeckCard;