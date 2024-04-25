// LoginPage.js
import React, { useState, useRef, useContext } from 'react';
import { Form, Button, Alert , Container, Col, Row} from 'react-bootstrap';
import './LoginPage.css'
import { Link, useNavigate} from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function LoginPage() {
  
  const authCtx = useCart()
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if(isLogin){
      url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-2BL3_MC0b5vQYiS7pNfmLqBtEGl_OGg'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-2BL3_MC0b5vQYiS7pNfmLqBtEGl_OGg'
      } 
      fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }
    ).then((res) =>{
      setIsLoading(false)
      if(res.ok){
          return res.json();
      }else{
       return res.json().then((data) =>{
          //show an error modal
          let errorMessage = 'Authentication failed';
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          
          throw new Error(errorMessage)
        });
      }
    }).then(data => {
      authCtx.login(data.idToken)
      navigate('/');

    })
    .catch(err =>{
      alert(err.message)
    })
   } 

  return (
    <Container fluid>
        <Row className="justify-content-center align-items-center ">
          <Col className="text-center mb-5">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        </Col>
      </Row>
      
      <Container className="container-sm d-flex justify-content-center">
      <Form onSubmit={submitHandler} className="w-50">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
        </Form.Group>
        <div className="mt-2 mb-3 d-flex flex-column justify-content-around align-items-center">
       <div>
    <Button variant="primary" type="submit" size="md">
      {isLogin ? 'Login' : 'Create Account'}
    </Button>
      </div>
      <br></br>
      <div>
    <Button variant="primary" type="submit" size="md" onClick={switchAuthModeHandler}>
      {isLogin ? 'Create new account' : 'Login with existing account'}
    </Button>
  </div>
</div>

           
      </Form>
     </Container>
      </Container>
  );
}

export default LoginPage;
