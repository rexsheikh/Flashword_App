import './Card.css'
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';

const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")
 const [score,setScore] = useState();
 const [user, token] = useAuth();
 const [word,setWord] = useState();
 const[deckIndex,setDeckIndex] = useState(0)


 useEffect(() => {
  getWord();
    }, [])


 function handleDefClick(){
     setShowDef("show")
 }

function handleGoodClick(){
  setScore(word.score + 1)
  updateWordScore()
  setShowDef("hide")
  setDeckIndex(deckIndex + 1)
}
function handleBadClick(){
  setScore(word.score -1)
  updateWordScore()
  setShowDef("hide")
  setDeckIndex(deckIndex + 1)

}

function handleNextClick(){
  setDeckIndex(deckIndex + 1)
  setShowDef("hide")
  getWord()
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
        `http://127.0.0.1:8000/api/decks/get_word/${props.parentDecks[0].words[deckIndex].word}/`,
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

  // <div className="card">
  // <h2> {props.parentDecks[0].words[deckIndex].word}</h2>
  // <div>
  //     <button onClick = {handleDefClick}> Show Definition</button>
  // </div>
  // <p className={showDef}> {props.parentDecks[0].words[deckIndex].definition}</p>
  // <div> 
  //  <button onClick = {handleGoodClick} > Good </button>  
  // </div>
  // <div> 
  //  <button onClick = {handleBadClick} > Bad </button>  
  // </div>
  // <div> 
  //  <button> Neutral </button>  
  // </div>
  // <div> 
  //  <button onClick = {handleNextClick}> Next Card </button>  
  // </div>
  

  return (  

    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.parentDecks[0].words[deckIndex].word}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <button onClick = {handleDefClick}> Show Definition</button>
        </Card.Subtitle>
        <Card.Text>
          <p className = {showDef}> {props.parentDecks[0].words[deckIndex].definition} </p>
        </Card.Text>
        <Card.Footer>
          <div className='button-container'>
          <button onClick = {handleGoodClick} > Good </button>  
          <button> Neutral </button>  
          <button onClick = {handleBadClick} > Bad </button>  
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
        
    );
}
 
export default DeckCard;