import React,{Suspense} from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



//Lazy loaded components

const Home = React.lazy(() => import('./components/Home/Home'));
const Store = React.lazy(() => import('./components/Store/Store'))
const ProductPage = React.lazy(() => import('./components/Store/ProductPage'));
const About = React.lazy(() => import('./components/About/About'));
const ContactUs = React.lazy(() => import('./components/ContactUs/ContactUs'));
const LoginPage = React.lazy(() => import('./components/Authentication/LoginPage'));

function App() {

  
  return (
   <>
   <Router>
    <CartProvider>
    <Header/>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/store" element={<Store/>} />
    <Route path="/store/:productId" element={<ProductPage/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/contactus" element={<ContactUs/>} />
    </Routes>
    </Suspense>
    <Footer/>
    </CartProvider>
  </Router>
   </>

  );
}

export default App;
