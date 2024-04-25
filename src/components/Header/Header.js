import React,{useState, useEffect} from 'react'
import {Navbar, Container, Button, Nav, Modal,Table } from 'react-bootstrap'
import { Link ,useLocation, useNavigate} from 'react-router-dom';
import {useCart} from '../../context/CartContext'
import './Header.css'

const Header = () => {

    const [navbarHeight, setNavbarHeight] = useState(0); // State to store navbar height
    useEffect(() => {
      // Get the height of the navbar when it mounts
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        const height = navbar.offsetHeight;
        setNavbarHeight(height);
      }
    }, []);

    const {cartElements,
       totalAmount, 
       removeCartItem,
       increaseItemQuantity,
       decreaseItemQuantity,
       isLoggedIn,
       login,
       logout,
      // fetchCartItems
      } = useCart();
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const handleShowCartModal = () => setShowCartModal(true);
    const handleCloseCartModal = () => setShowCartModal(false);
    
    // useEffect(() => {
    //   fetchCartItems(); // Call fetchCartItems when the component mounts
    // }, []); 
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleLoginClick = () => {
      // Navigate to the '/login' route
      navigate('/login');
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
          alert('Order success!');
        } else {
          // Handle checkout logic here
          console.log('Checkout');
        }
      };
      const isStorePage = location.pathname === '/store';
      const isProductPage = location.pathname.startsWith('/store/');

    const handleRemoveItem =(id)=>{
        removeCartItem(id);
    }
    const handleIncreaseQuantity =(id) =>{
        increaseItemQuantity(id);
    }
    const handleDecreaseQuantity =(id)=>{
        decreaseItemQuantity(id);
    }

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" style={{position:'fixed', width:'100%', zIndex:'1000'}}>
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className="nav-link-style">Home</Nav.Link>
          {isLoggedIn && ( 
            <Nav.Link as={Link} to="/store" className="nav-link-style">Store</Nav.Link>
          )}
          <Nav.Link as={Link} to="/about" className="nav-link-style">About</Nav.Link>
          <Nav.Link as={Link} to="/contactus" className="nav-link-style">ContactUs</Nav.Link>
          {isLoggedIn && ( // Only render the logout button if the user is logged in
      <Link to="/login">
      <Button variant="light" onClick={logout}>Logout</Button>
      </Link> 
          )}
      {!isLoggedIn && (
          <Button variant="primary" onClick={handleLoginClick}>Login</Button>
        )}
        </Nav>
      </Navbar.Collapse>
      {(isStorePage || isProductPage) && (
        <>
        <Button variant="light" onClick={handleShowCartModal}>Cart</Button>
      <span className="counter">{cartElements.length}</span>
        </>
      )}

    </Container>
    <Modal show={showCartModal} onHide={handleCloseCartModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Pic</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartElements.map((item, index) => (
                <tr key={item.id}>
                  <td><img src={item.imageUrl} alt={item.title} style={{ width: '100px' }} /></td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="outline-secondary" onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
            <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                 <Button variant="outline-secondary" onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
            </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>Remove</Button> {/* Remove button */}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="text-right"><strong>Total:</strong></td>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>Close</Button>
          <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
        </Modal.Footer>
      </Modal>
  </Navbar>
     <div style={{ paddingTop: navbarHeight + 'px', marginBottom: '10px'}}>
      {/* Add padding equal to navbar height */}
     {/* Content below the navbar */}
   </div>
   </>
  )
}

export default Header;