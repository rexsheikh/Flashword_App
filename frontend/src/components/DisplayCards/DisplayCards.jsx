import DeckCard from "../DeckCard/DeckCard";
import '../DeckCard/DeckCard.css'
import { useState,useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const DisplayCards = (props) => {
  



    return ( 
        <div>
            {props.parentDecks.map((deck,i) => {
                return (
                    <div>
                        <DeckCard
                        key = {i}
                        deck = {deck}
                        />
                        
                    </div>
                    
                )
            })}
            
        </div>
     );
}
 
export default DisplayCards;