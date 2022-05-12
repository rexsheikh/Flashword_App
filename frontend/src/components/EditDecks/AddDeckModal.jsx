import { Modal,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddDeck = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[word,setWord] = useState('')
    const [user, token] = useAuth();
    const [title,setTitle] = useState()

  

    const handleEntry = () =>{
        createDeck()
      }


    const createDeck = async () => {
        let body = {
            user: user.name,
            title: title,
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
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter a title for your new deck!</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <li>
                    <input type = "text"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="submit" onClick = {handleEntry}>submit</button>
              </li>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
 
export default AddDeck;