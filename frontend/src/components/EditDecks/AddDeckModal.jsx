import { Modal,Button } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddDeck = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[word,setWord] = useState('')
    const [user, token] = useAuth();
    const [title,setTitle] = useState()
    const[decks,setDecks] = useState([])

    const handleEntry = () => {
        createDeck()
        handleClose()
      }

    
    useEffect(() => {
        fetchDecks();
    },);


    useEffect(() => {
        fetchDecks();
      }, [token]);
    
      const fetchDecks = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/api/decks/",{
            headers: {
              Authorization: "Bearer " + token
            },
          });
          setDecks(response.data);
        } catch (error) {
          console.log(error.message)
        }
      }

      
    const createDeck = async () => {
        let body = {
            user: user.username,
            title: title,
            deck_streak: 0,
        };
            try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/decks/`,
                body,
                {
                headers: {
                Authorization: "Bearer " + token
                },
            });
            } catch (error) {
            console.log(error.message)
            }}


    return (
        <div> 
            <Button style = {{backgroundColor:'#6D8B74', borderColor:"white", borderRadius:"20px", maxWidth:"20rem",marginLeft:"55rem", fontFamily: "Roboto Mono, monospace"}} variant="primary" onClick={handleShow}>
                <svg style = {{marginTop:"-6px", marginRight:"10px"}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                    <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                </svg>
                Add a Deck 
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style = {{backgroundColor:"#D0C9C0"}} closeButton>
                    <Modal.Title>Enter a title for your new deck!</Modal.Title>
                </Modal.Header>
                <Modal.Body style = {{backgroundColor:"#D0C9C0"}}>

                <li style = {{listStyle:"none"}}>
                    <input type = "text"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <button style = {{color:"white",backgroundColor:'#6D8B74', border:"none", marginLeft:"10px"}} type="submit" onClick = {handleEntry}>submit</button>
              </li>
                </Modal.Body>
                <Modal.Footer style = {{backgroundColor:"#D0C9C0"}}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
 
export default AddDeck;