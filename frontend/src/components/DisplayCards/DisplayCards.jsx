import DeckCard from "../DeckCard/DeckCard";
import TitleCard from "../TitleCard/TitleCard";
import '../DeckCard/DeckCard.css'
import { Container,Row,Col} from "react-bootstrap";


const DisplayCards = (props) => {

//     <Container style = {{height:"40vh",width:"100vw"}}>
//     <Row>
//       {props.parentDecks.map((deck,i) => {
//           if(deck.words.length === 0){
//               return(
//                   <Col>
//                       <TitleCard
//                       deck = {deck}
//                       />
//                   </Col>
//               )
//           }else{
//           return (
//               <Col style = {{position:"relative"}}>
//                   <TitleCard
//                   deck = {deck}
//                   />
//                   <DeckCard
//                   key = {i}
//                   deck = {deck}
//                   />
//               </Col>
              
//           )
//       }})}
//       </Row>
//   </Container>

//TRY div className = "card-deck"
    return ( 
        <Container className = "fluid" style = {{height:"50vh",width:"100vw"}}>
            <Row>
                {props.parentDecks.map((deck,i)=>{
                    return(
                        <Col style = {{marginTop:"50px"}}>
                            <TitleCard
                            index = {i}
                            deck = {deck}
                            />
                            <DeckCard
                            index = {i}
                            deck = {deck}
                            />
                        </Col>
                    )
                }
                    )}
            </Row>
        </Container>
    )
}
 
export default DisplayCards;