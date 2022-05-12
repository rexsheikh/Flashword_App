import DeckCard from "../DeckCard/DeckCard";
import TitleCard from "../TitleCard/TitleCard";
import '../DeckCard/DeckCard.css'
import { Container,Row,Col } from "react-bootstrap";


const DisplayCards = (props) => {

    return ( 
        <Container style = {{height:"400px"}}>
          <Row>
            {props.parentDecks.map((deck,i) => {
                if(deck.words.length === 0){
                    return(
                        <TitleCard
                        deck = {deck}
                        />
                    )
                }else{
                return (
                    <Col style = {{position:"relative"}}>
                        <TitleCard
                        deck = {deck}
                        />
                        <DeckCard
                        key = {i}
                        deck = {deck}
                        />
                    </Col>
                    
                )
            }})}
            </Row>
        </Container>
     );
}
 
export default DisplayCards;