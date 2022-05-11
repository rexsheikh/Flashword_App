import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const TitleCard = (props) => {
    const[showTitle,setShowTitle] = useState(10)
   
   
    function handleClick(){
        setShowTitle(-1)
    }

    
    return ( 
        <div>
            <Card style = {{position:"absolute", zIndex:`${showTitle}`,width:"300px",height:"300px",border:"nond",width: '18rem', backgroundColor:"#EFEAD8", borderRadius:"20px", fontFamily: "Roboto Mono, monospace"}}>
                <h2> {props.deck.title} </h2>
                <button onClick = {handleClick}> Click to Start </button>
            </Card>
            <div>

            </div>
        </div>
     );
}
 
export default TitleCard;