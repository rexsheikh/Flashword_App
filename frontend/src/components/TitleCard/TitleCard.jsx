import { useState } from 'react';
import { Card } from 'react-bootstrap';
import DeleteDeck from '../EditDecks/DeleteDeckModal';
import MainModal from '../Modal/Modal';

const TitleCard = (props) => {
    const[showTitle,setShowTitle] = useState(10)
   
   
    function handleClick(){
        setShowTitle(-1)
    }

    
    return ( 
        <div>
            <Card style = {{position:"absolute", zIndex:`${showTitle}`,width:"300px",height:"300px",border:"nond",width: '18rem', backgroundColor:"#EFEAD8", borderRadius:"20px", fontFamily: "Roboto Mono, monospace"}}>
                <ul>
                    <li style = {{marginRight:"6rem",paddingLeft:"0"}}> <DeleteDeck title = {props.deck.title}/></li>
                    <li> <MainModal title = {props.deck.title}/></li>
                </ul>
                <h2> {props.deck.title} </h2>
                <button style = {{backgroundColor:'#6D8B74', border:"none", color:"white", marginLeft:"5.8rem"}}onClick = {handleClick}> Click to Start </button>
            </Card>
            <div>

            </div>
        </div>
     );
}
 
export default TitleCard;