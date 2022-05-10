import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

const TitleCard = (props) => {
    const[showTitle,setShowTitle] = useState(10)
   
   
    function handleClick(){
        setShowTitle(-1)
    }

    let data = [
        [
          {
            type: "date",
            id: "Date",
          },
          {
            type: "number",
            id: "Won/Loss",
          },
        ],
        [new Date(2013, 0, 4), 38177],
        [new Date(2013, 0, 5), 38705],
        [new Date(2013, 0, 12), 38210],
        [new Date(2013, 0, 13), 38029],
        [new Date(2013, 0, 19), 38823],
        [new Date(2013, 0, 23), 38345],
        [new Date(2013, 0, 24), 38436],
        [new Date(2013, 0, 30), 38447],
      ];

    

    

    return ( 
        <div>
            <Card style = {{position:"absolute", zIndex:`${showTitle}`,width:"300px",height:"300px",border:"nond",width: '18rem', backgroundColor:"#EFEAD8", borderRadius:"20px", fontFamily: "Roboto Mono, monospace"}}>
                <h2> {props.deck.title} </h2>
                <button onClick = {handleClick}> Click to Start </button>
                <Card.Body>
                    <Chart stye = {{zIndex:"100", position:"absolute"}}
                    chartType="Calendar"
                    width="100%"
                    height="400px"
                    data = {data}
                    />
                </Card.Body>
            </Card>
            <div>

            </div>
        </div>
     );
}
 
export default TitleCard;