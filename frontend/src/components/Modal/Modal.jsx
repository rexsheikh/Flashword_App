import { Modal,Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const MainModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[query,setQuery] = useState('')
    const[word,setWord] = useState('')
    const [user, token] = useAuth();
    console.log(query)

    const handleSearch = (currentTitle) =>{
        getWebsterWord();
        createWord();
        addWord(currentTitle);
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

      const addWord = async (currentTitle) => {
          let body = {

          };
         try {
           let response = await axios.patch(
             `http://127.0.0.1:8000/api/decks/add_word/${currentTitle}/${query}/`,
             body,
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
            <Button variant="primary" onClick={handleShow} style = {{backgroundColor:'#6D8B74', border:"none"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                 </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style = {{backgroundColor:"#D0C9C0"}}closeButton>
                    <Modal.Title >Add a word!</Modal.Title>
                </Modal.Header>
                <Modal.Body style = {{backgroundColor:"#D0C9C0"}}>

                <li>
                    <input type = "text"
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <button style = {{backgroundColor:'#6D8B74', border:"none", color:"white", marginLeft:"5.8rem"}} type="submit" onClick = {() => handleSearch(props.title)}>submit</button>
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
export default MainModal;