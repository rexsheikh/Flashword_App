import DeckCard from "../DeckCard/DeckCard";
import TitleCard from "../TitleCard/TitleCard";
import '../DeckCard/DeckCard.css'
import { Container,Row,Col} from "react-bootstrap";





const DisplayCards = (props) => {


    return ( 
        <Container className = "fluid" style = {{height:"50vh",width:"100vw"}}>
            <Row>
                {props.parentDecks.map((deck,i)=>{
                    if(deck.words.length === 0){
                        return(
                            <Col style = {{marginTop:"50px"}}>
                                <TitleCard
                                index = {i}
                                deck = {deck}
                                />
                            </Col>
                        )
                    }
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