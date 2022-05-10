import DeckCard from "../DeckCard/DeckCard";
import '../DeckCard/DeckCard.css'
import { Container,Row,Col } from "react-bootstrap";

const DisplayCards = (props) => {
  



    return ( 
        <Container>
          <Row>
            {props.parentDecks.map((deck,i) => {
                return (
                    <Col>
                        <DeckCard
                        key = {i}
                        deck = {deck}
                        />
                    </Col>
                    
                )
            })}
            </Row>
        </Container>
     );
}
 
export default DisplayCards;