import { Modal,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DeleteDeck = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[word,setWord] = useState('')
    const [user, token] = useAuth();
    const [title,setTitle] = useState()

  

    const handleYes = (currentTitle) =>{
        deleteDeck(currentTitle)
      }


    const deleteDeck = async (currentTitle) => {
            try {
            let response = await axios.delete(
                `http://127.0.0.1:8000/api/decks/delete_deck/${currentTitle}`,
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
            <Button variant="primary" onClick={handleShow} style = {{backgroundColor:'#6D8B74', border:"none",marginRight:"5rem"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
             </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style = {{backgroundColor:"#D0C9C0"}} closeButton>
                    <Modal.Title>Are you sure you want to delete this deck?</Modal.Title>
                </Modal.Header>
                <Modal.Body style = {{backgroundColor:"#D0C9C0"}} >
                <li style = {{listStyle:"none"}}>
                    <ul>
                        <Button style = {{backgroundColor:'#6D8B74', border:"none", color:"white", marginLeft:"5.8rem"}} variant="secondary" onClick = {() => handleYes(props.title)}> Yes</Button>
                    </ul>
                    <ul>
                        <Button style = {{backgroundColor:'#6D8B74', border:"none", color:"white", marginLeft:"5.8rem"}} variant="secondary" onClick={handleClose}> Cancel </Button>
                    </ul>
                </li>
                </Modal.Body>
            </Modal>
        </div>
    );
  }
 
export default DeleteDeck;