import React, { useRef, useState } from 'react'
import { Container, Form, Button,Row, Col} from 'react-bootstrap';
import generic from '../../assests/generic.png'
import './ContactUs.css'

const ContactUs = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = {
            name:nameRef.current.value,
            email:emailRef.current.value,
            phone:phoneRef.current.value
        }
        console.log('Form submitted:', formData);
        try{
            const response = await fetch(`https://react-ecom-e69f7-default-rtdb.firebaseio.com/ecommerce.json`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error('Failed to submit form')
            }
            console.log('Successfully submitted');
            nameRef.current.value = '';
            emailRef.current.value = '';
            phoneRef.current.value = '';
        }catch(error){
            console.log('Error submitting form', error.message);
        }
    }
   
  return (
    <Container fluid>
        <Row className="justify-content-center align-items-center ">
          <img src={generic} alt="Image" lassName="img-fluid" style={{ width: '100%', height: '350px' }} />
          <Col className="text-center mb-5">
          <h2 className="mt-3">Contact Us</h2>
        </Col>
      </Row>
            <Container className="container-sm d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="w-50">
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="number" ref={phoneRef} placeholder="Enter your phone number" />
                </Form.Group>
                <br></br>
                <div className="mt-auto mb-3 d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </div>
            </Form>
            </Container>
        </Container>
  )
}

export default ContactUs