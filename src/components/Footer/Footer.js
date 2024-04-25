import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faSpotify } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
    <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="mb-3">Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item mr-3">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
              </li>
              <li className="list-inline-item mr-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faSpotify} size="2x" />
                </a>
              </li>
            </ul>
          </Col>
          <Col md={8}>
            <h5>About Us</h5>
            <p>We are a passionate team dedicated to bringing you the best content.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer