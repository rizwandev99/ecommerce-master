import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const ProductPage = () => {
    const {addCartItem} = useCart()
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data based on productId
    fetchData(productId);
  }, [productId]);

  const fetchData = async (productId) => {
    try {
      const response = await fetch(`../products.json`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch product data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      const selectedProduct = data.find((product) => product.id.toString() === productId);
      setProduct(selectedProduct);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const handleAddToCart = (product) =>{
    addCartItem(product)
   } 
  return (
    <Container className="mt-5" style={{ margin: '20px' }}>
      {product ? (
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center">
        {/* Image on the left with reduced size */}
        <Image src={product.imageUrl} fluid style={{ width: '400px', height: '450px', borderRadius:'10px'}} />
      </Col>
      <Col md={4}>
        {/* Product information and "Add to Cart" button on the right */}
        <Card style={{ minWidth: '300px', marginTop: '20px'}}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <div className="d-flex justify-content-end align-items-center">
            <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            </div>
          </Card.Body>
        </Card>
        {/* Reviews section */}
        <div>
            <br></br>
          <h3>Reviews:</h3>
          <ul>
            ******
            {/* {product.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))} */}
          </ul>
        </div>
      </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default ProductPage;