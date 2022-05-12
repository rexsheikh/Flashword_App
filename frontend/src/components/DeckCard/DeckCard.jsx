import './DeckCard.css'
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Card} from 'react-bootstrap';
import DeleteDeck from '../EditDecks/DeleteDeckModal';
import MainModal from '../Modal/Modal';


const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")
 const [score,setScore] = useState();
 const [user, token] = useAuth();
 const [word,setWord] = useState([]);
 const [index,setIndex] = useState(0);

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
today = today.toString()
 



 function handleDefClick(){
     setShowDef("show")
 }


function handleGoodClick(currentWord,currentWordScore,today){
  getWord(currentWord)
  setScore(currentWordScore + 1)
  updateWordScore(currentWord,currentWordScore)
  updateWordReviews(currentWord,today)
  setShowDef("hide")
  setIndex(index + 1)
  
}
function handleEasyClick(currentWord,currentWordScore,today){
  getWord(currentWord)
  setScore(currentWordScore + 2)
  updateWordScore(currentWord,currentWordScore)
  updateWordReviews(currentWord,today)
  setShowDef("hide")
  setIndex(index + 1)
  
}

function handleHardClick(currentWord,currentWordScore,today){
  getWord(currentWord)
  setScore(currentWordScore -1)
  updateWordScore(currentWord,currentWordScore)
  updateWordReviews(currentWord,today)
  setShowDef("hide")
  setIndex(index + 1)

}
function handleAgainClick(currentWord,currentWordScore,today){
  getWord(currentWord)
  setScore(currentWordScore -2)
  updateWordScore(currentWord,currentWordScore)
  updateWordReviews(currentWord,today)
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
 const updateWordReviews = async (currentWord,today) => {
   let body = {

   }
    try {
      let response = await axios.patch(
        `http://127.0.0.1:8000/api/decks/update_word_reviews/${currentWord}/${today}/`, body,
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
    <Card style={{ width: '18rem', backgroundColor:"#EFEAD8", borderRadius:"20px", fontFamily: "Roboto Mono, monospace",position:"absolute",zIndex:"0"}}>
        <Card.Body>
          <DeleteDeck title = {props.deck.title} />
          <MainModal title = {props.deck.title}/>
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
            <button className='card-button' onClick = {() => handleAgainClick(props.deck.words[index].word, props.deck.words[index].score,today)} > Again </button>  
            <button className='card-button' onClick = {() => handleHardClick(props.deck.words[index].word, props.deck.words[index].score,today)} > Hard </button>  
            <button className='card-button' onClick = {() => handleGoodClick(props.deck.words[index].word, props.deck.words[index].score,today)} > Good </button>   
            <button className='card-button' onClick = {() => handleEasyClick(props.deck.words[index].word, props.deck.words[index].score,today)} > Easy </button> 
          </Card.Footer>
        </Card.Body>
      </Card>
  </div>
        
    );
}
export default DeckCard;