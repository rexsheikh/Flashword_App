import './Card.css'
import { useState } from 'react';

const DeckCard = (props) => {
 const [showDef,setShowDef] = useState("hide")

 function handleDefClick(){
     setShowDef("show")
 }

    return (  
        <div className="card">
            <h1>{props.parentDeck[0].title}</h1>
            <h2> {props.parentDeck[0].words[0].word}</h2>
            <div>
                <button onClick = {handleDefClick}> Show Definition</button>
            </div>
            <p className={showDef}> {props.parentDeck[0].words[0].definition}</p>

        </div>
    );
}
 
export default DeckCard;