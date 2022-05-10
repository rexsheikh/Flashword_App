import './DeckCard.css'
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from 'react';
import { Card} from 'react-bootstrap';
import { Badge } from 'react-bootstrap';

const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")
 const [score,setScore] = useState();
 const [user, token] = useAuth();
 const [word,setWord] = useState([]);
 const [index,setIndex] = useState(0);
 



 function handleDefClick(){
     setShowDef("show")
 }


function handleGoodClick(currentWord,currentWordScore){
  getWord(currentWord)
  setScore(currentWordScore + 1)
  updateWordScore(currentWord,currentWordScore)
  setShowDef("hide")
  setIndex(index + 1)
  
}
function handleEasyClick(currentWord,currentWordScore){
  getWord(currentWord)
  setScore(currentWordScore + 2)
  updateWordScore(currentWord,currentWordScore)
  setShowDef("hide")
  setIndex(index + 1)
  
}

function handleHardClick(currentWord,currentWordScore){
  getWord(currentWord)
  setScore(currentWordScore -1)
  updateWordScore(currentWord,currentWordScore)
  setShowDef("hide")
  setIndex(index + 1)

}
function handleAgainClick(currentWord,currentWordScore){
  getWord(currentWord)
  setScore(currentWordScore -2)
  updateWordScore(currentWord,currentWordScore)
  setShowDef("hide")
  setIndex(index + 1)

}


 const updateWordScore = async (currentWord,currentWordScore) => {
   let body = {

   }
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/decks/update_word_score/${currentWord}/${currentWordScore}/`, body,
        {
        headers: {
          Authorization: "Bearer " + token
        },
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  const getWord = async (currentWord) =>{
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/decks/get_word/${currentWord}/`,
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
  <div className="title-example">
    <Card style={{ width: '18rem', backgroundColor:"#EFEAD8", borderRadius:"20px", fontFamily: "Roboto Mono, monospace"}}>
        <Card.Body>
          <Card.Title>{props.deck.words[index].word}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
              <button className = "card-button" onClick = {handleDefClick}> Show Definition</button>
          </Card.Subtitle>
          <Card.Text>
            <p className = {showDef}> {props.deck.words[index].definition} </p>
          </Card.Text>
            {props.deckId}
          <Card.Text>
          </Card.Text>
          <Card.Footer>
            <button className='card-button' onClick = {() => handleAgainClick(props.deck.words[index].word, props.deck.words[index].score)} > Again </button>  
            <button className='card-button' onClick = {() => handleHardClick(props.deck.words[index].word, props.deck.words[index].score)} > Hard </button>  
            <button className='card-button' onClick = {() => handleGoodClick(props.deck.words[index].word, props.deck.words[index].score)} > Good </button>   
            <button className='card-button' onClick = {() => handleEasyClick(props.deck.words[index].word, props.deck.words[index].score)} > Easy </button> 
          </Card.Footer>
        </Card.Body>
      </Card>
  </div>
        
    );
}
 
export default DeckCard;