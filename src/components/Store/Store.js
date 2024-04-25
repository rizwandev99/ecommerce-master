import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useCart} from '../../context/CartContext'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import generic from '../../assests/generic.png'
import './Store.css'

const Store = () => {

    const {addCartItem} = useCart();
    const [products, setProducts] = useState([]);

      useEffect(() =>{
        fetchData();
      },[])
      const fetchData = async () =>{
        try{
          const response = await fetch('./products.json');
          const data = await response.json();
          setProducts(data);
        }catch (error){
          console.log('Error fetching data',error);
        }
      }
     const handleAddToCart = (product) =>{
      addCartItem(product)
     } 
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center ">
          <img src={generic} alt="backfoto"  className="img-fluid" style={{ width: '100%', height: '350px' }} />
        <Col className="text-center mb-5">
          <h2 className="mt-3">Store</h2>
        </Col>
      </Row>
      <Container>
      <Row>
        {products.map(product => (
          <Col key={product.title} xs={12} sm={6} md={4} lg={3}>
            <Card.Title className='mb-2'>{product.title}</Card.Title>
            <Card className="mb-4 product-card">
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Text>Price: ${product.price}</Card.Text>
                <div className='btns'>
                <Button variant="secondary" className="btn btn-light" size="sm">
                    <Link to={`/store/${product.id}`} className="text-black">View Details</Link>
                  </Button>
                <Button variant="primary" onClick={()=> handleAddToCart(product)} className='justify-content-end' size="sm">Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
    
    </Container>
  )
}

export default Store