import DeckCard from "../DeckCard/DeckCard";
import '../DeckCard/DeckCard.css'
import { useState,useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const DisplayCards = (props) => {
  const [score,setScore] = useState();
  const [user, token] = useAuth();
  const [word,setWord] = useState();
  const[deckIndex,setDeckIndex] = useState(0)




    return ( 
        <div>
            {props.parentDecks.map((deck,i) => {
                return (
                    <div>
                        <DeckCard
                        key = {i}
                        currentWord = {deck.words[deckIndex].word} 
                        definition = {deck.words[deckIndex].definition}
                        currentWordScore = {deck.words[deckIndex].score}
                        />
                        
                    </div>
                    
                )
            })}
            
        </div>
     );
}
 
export default DisplayCards;