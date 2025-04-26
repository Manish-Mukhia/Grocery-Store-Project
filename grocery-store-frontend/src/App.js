import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ItemList from './components/ItemList';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
import FullCart from './components/FullCart';
import Navbar from './components/Navbar';
import './App.css';

function AppContent() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartAnimation, setCartAnimation] = useState(false);
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.log('Error fetching items:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (itemId, quantity) => {
    const item = items.find(item => item._id === itemId);
    const newCart = [...cart];
    const existingItem = newCart.find(cartItem => cartItem.itemId === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCart.push({
        itemId,
        name: item.name,
        quantity,
        price: item.price || 0
      });
    }

    setCart(newCart);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 500);
  };

  const editCart = (itemId) => {
    const newQuantity = prompt('Enter new quantity:');
    if (newQuantity && !isNaN(newQuantity)) {
      const updatedCart = cart.map(item =>
        item.itemId === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
      );
      setCart(updatedCart);
    } else {
      alert('Invalid quantity');
    }
  };

  const deleteFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.itemId !== itemId);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (!address) {
      alert('Please enter a delivery address.');
      return;
    }
    axios.post('http://localhost:5000/api/cart/add', { userId: 'user1', items: cart, address })
      .then(() => {
        setOrderPlaced(true);
        setCart([]);
        localStorage.removeItem('cart');
      })
      .catch((error) => console.log('Error during checkout:', error));
  };

  return (
    <div className="container">
      {/* ✅ Only show Navbar if NOT on /admin */}
      {location.pathname !== '/admin' && (
        <Navbar
          cart={cart}
          address={address}
          setAddress={setAddress}
          handleCheckout={handleCheckout}
          cartAnimation={cartAnimation}
        />
      )}

      <Routes>
        {/* ✅ Protect /admin route */}
        <Route path="/admin" element={
          localStorage.getItem('isAdminLoggedIn') === 'true' ? (
            <AdminPage />
          ) : (
            <AdminLogin />
          )
        } />
        
        <Route path="/cart" element={
          <FullCart
            cart={cart}
            editCart={editCart}
            deleteFromCart={deleteFromCart}
          />
        } />
        
        <Route path="/" element={
          <div className="content">
            <h1 className="title">🛒 Grocery Store</h1>
            {!orderPlaced ? (
              <ItemList items={items} addToCart={addToCart} />
            ) : (
              <div className="thank-you">
                <h2>🎉 Enquiry sent successfully!</h2>
                <p>Will get back to you soon. Thank you!</p>
              </div>
            )}
          </div>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
