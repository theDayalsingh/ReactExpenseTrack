import React, { useState, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

function MyVerticallyCenteredModal(props) {
    const nameInputRef = useRef();
  const urlInputRef = useRef()

  // const [isProfileLogin, setIsProfileLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

   const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredURL = urlInputRef.current.value;

    setIsLoading(true); 

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCTZQtTYs12UMCSLl27RvELtCVu-SK81UQ",

      {
        method: "POST",
        body: JSON.stringify({
          displayName: enteredName,
          photoUrl: enteredURL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
      }else{
        return res.json().then((data)=>{
          console.log(data)
        })
      }
    })
  
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Profile Update
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={submitHandler }>
         
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              ref={nameInputRef}
              id="name"
              required      
              name="name"
            />              
        
            <Form.Label>Profile Photo Url</Form.Label>
            <Form.Control
              type="text"
              name="Profile Photo Url"
              placeholder="Profile Photo Url"
               ref={urlInputRef}
              id="profilephotourl"
              required
            />
          
            {!isLoading && (
            <Button type="submit" className="px-5 text-uppercase text-dark fw-bold bg-info">
            Update
          </Button>
          )}
          {isLoading && <p>Sending request...</p>}        
        </Form>
          </Modal.Body>
          <Modal.Footer>
          <button >Close</button>
          <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
          </Modal>
          );
        }
        
        const Logindirect = () => {

  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    <h1 className='text-center m-4 text-secondary'>Welcome to Expense Tracker!!!</h1>
    <h5 className='text-center m-4 text-danger'>Your Profile is incomplete. <Button variant="info" onClick={() => setModalShow(true)}>
    Complete now
  </Button></h5>
    
  <MyVerticallyCenteredModal
    show={modalShow}
    onHide={() => setModalShow(false)}
  />
    </>
  )
}

export default Logindirect


