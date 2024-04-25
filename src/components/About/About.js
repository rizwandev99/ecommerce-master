import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import generic from '../../assests/generic.png'
import band from '../../assests/band.jpg'

const About = () => {
  return (
    <Container fluid>
        <Row className="justify-content-center align-items-center ">
          <img src={generic} alt="Image" lassName="img-fluid" style={{ width: '100%', height: '350px' }} />
          <Col className="text-center mb-5">
          <h2 className="mt-3">About Us</h2>
        </Col>
      </Row>
      <Container className="mt-5 mb-5">    
      <Row>
        <Col md={4} className="d-flex align-items-center">
          <div className="about-image-container">
            <img src={band}style={{ width: '250px', height: '250px', borderRadius: '50%' }}/>
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              hendrerit magna eget tortor commodo, vel dapibus elit commodo.
              Donec quis turpis quis nulla dapibus volutpat vel ac nisl.
              Integer vulputate ullamcorper magna, et malesuada nunc tempus
              quis.
            </p>
            <p>
              Phasellus in mi a nisi viverra iaculis. Proin tristique metus ac
              ipsum scelerisque lobortis. Duis mollis orci ac augue placerat,
              vel consequat neque malesuada.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    </Container>
  )
}

export default About