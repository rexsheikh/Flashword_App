import { useState } from 'react';
import { useEffect } from 'react';
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
                <Card.Body>
                    <Chart stye = {{zIndex:"100", position:"absolute"}}
                    chartType="ScatterChart"
                    data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                    width="100%"
                    height="400px"
                    />
                </Card.Body>
            </Card>
            <div>

            </div>
        </div>
     );
}
 
export default TitleCard;