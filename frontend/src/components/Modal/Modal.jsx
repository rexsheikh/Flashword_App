import { Modal,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const MainModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[query,setQuery] = useState('')
    const[word,setWord] = useState('')
    const [user, token] = useAuth();

    const handleSearch = () =>{
        getWebsterWord();
        createWord();
        addWord();
      }

    const getWebsterWord = async () =>{
        try {
            let response = await axios.get(
            `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=939c6c16-c538-4b7c-8ee9-f01f9725a621`
            );
            setWord(response.data);
            console.log("alert, api call made")
        } catch (e) {
            console.log(e.message);
        }
        }

    const createWord = async () => {
        let body = {
            score: 0,
            word: query,
            definition: word[0].shortdef[0]
        };
            try {
            let response = await axios.post(
                `http://127.0.0.1:8000/api/decks/word_list/`,
                body,
                {
                headers: {
                Authorization: "Bearer " + token
                },
            });
            } catch (error) {
            console.log(error.message)
            }}

      const addWord = async () => {
         try {
           let response = await axios.patch(
             `http://127.0.0.1:8000/api/decks/add_word/5/${query}/`,
             {
             headers: {
               Authorization: "Bearer " + token
             },
           });
         } catch (error) {
           console.log(error.message)
         }
        }
  
    return (
        <div> 
            <Button variant="primary" onClick={handleShow}>
            Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Search for a word...</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <li>
                    <input type = "text"
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" onClick = {handleSearch}>submit</button>
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
export default MainModal;