import { useState } from 'react';

const TitleCard = (props) => {
    const[showTitle,setShowTitle] = useState(10)
   
   
    function handleClick(){
        setShowTitle(-1)
    }

    return ( 
        <div style = {{position:"absolute", zIndex:`${showTitle}`}}>
         <h2> TEST</h2>
         <button onClick = {handleClick}> Show Definition</button>
        </div>
     );
}
 
export default TitleCard;