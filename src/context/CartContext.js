import React,{createContext, useContext, useState} from 'react'


//Create a new context for the shopping cart

const CartContext = createContext({
    token: '',
    isLoggedIn : false,
    login: (token) => {},
    logout: () =>{},
    
});

//Custom hook to consume the shopping Cart Context

export const useCart = () => useContext(CartContext);

//Provider component to wrap the application and provide cart state 

export const CartProvider =({children}) =>{

    const [cartElements, setCartElements] = useState([]);
    const initialToken = localStorage.getItem('token')
    const[token, setToken] = useState(initialToken)


    const userIsLoggedIn = token;

//Login handler
const loginHandler = (token) =>{
    setToken(token)
    localStorage.setItem('token', token);
}
//Logout handler
const logoutHandler =()=>{
    setToken(null)
    localStorage.removeItem('token')
}

// Function to add an item to the cart using localStorage
const addCartItem = (item) =>{
    const isItemCart = cartElements.some(cartItem => cartItem.id === item.id);
    if(isItemCart){
        alert('Item is already in the cart')
        return;
    }
    setCartElements([...cartElements, item])
}
//Add to cart using Crud Api
// const addCartItem = async (item, userEmail) =>{
//     const isItemCart = cartElements.some(cartItem => cartItem.id === item.id);
//     if(isItemCart){
//         alert('Item is already in the cart')
//         return;
//     }
//     setCartElements([...cartElements, item])
//     try {
//         const response = await fetch(`https://crudcrud.com/api/a51533473ded4311bb1ac3595684c605/cart${userEmail}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(item),
//         });
//         if (response.ok) {
//           // Item added successfully, update local state or UI as needed
//         //   setCartElements(prevCartElements => [...prevCartElements, item]);
//         fetchCartItems(userEmail);
//         } else {
//           // Handle HTTP error
//           throw new Error('Failed to add item to cart');
//         }
//       } catch (error) {
//         console.error('Error adding item to cart:', error);
//         // Handle error gracefully, show error message to the user, etc.
//       }
// }

// const fetchCartItems = async (userEmail) => {
//     try {
//       const response = await fetch(`https://crudcrud.com/api/a51533473ded4311bb1ac3595684c605/cart${userEmail}`)
//         .then((response) => response.text())
//         .then((result) => console.log(result))
//         .catch((error) => console.error(error));
//       if (response.ok) {
//         // Items retrieved successfully, update local state or UI as needed
//         const data = await response.json();
//         setCartElements(data);
//       } else {
//         // Handle HTTP error
//         throw new Error('Failed to fetch cart items');
//       }
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//       // Handle error gracefully, show error message to the user, etc.
//     }
//   };
//Function to remove an item from the cart
const removeCartItem = (id) =>{
    const updateCart = cartElements.filter(item => item.id !== id);
    setCartElements(updateCart)
}
//Function to clear cart
const clearCart = () =>{
    setCartElements([])
}
//Function to increase quantity of items in cart
    const increaseItemQuantity = (id) =>{
        const updatedCart = cartElements.map(item => {
            if(item.id === id){
                return {...item, quantity:item.quantity + 1};
            }
            return item;
        })
        setCartElements(updatedCart);
    }

// Function to decrease quantity of item in cart
const decreaseItemQuantity = (id) =>{
    const updatedCart = cartElements.map(item => {
        if(item.id === id && item.quantity > 1 ){
            return {...item, quantity:item.quantity - 1};
        }
        return item;
    })
    setCartElements(updatedCart);
}
//calculate totalAmount 
const totalAmount = cartElements.reduce((total, item) =>{
    return total + (item.price * item.quantity);
}, 0)

//Create the value object to provide to consuming components
const value = {
    cartElements,
    addCartItem, 
    removeCartItem,
    clearCart,
    totalAmount,
    increaseItemQuantity,
    decreaseItemQuantity,
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler,
    //fetchCartItems
   
};
return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
)
}
