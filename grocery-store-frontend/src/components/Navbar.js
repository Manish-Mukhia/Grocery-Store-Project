import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cart, address, setAddress, handleCheckout, cartAnimation }) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2>🛍️ Grocery Store</h2>

        {/* ✅ Home Button */}
        <button
          className="cart-btn"
          style={{ fontSize: '14px', padding: '8px 12px' }}
          onClick={() => navigate('/')}
        >
          🏠 Home
        </button>
      </div>

      <div className="nav-right">
        {/* <button className={`cart-btn ${cartAnimation ? 'flash' : ''}`} onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length})
        </button> */}

        {showCart && (
          <div className="cart-dropdown">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0 }}>🧾 Your Cart</h4>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>❌</button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>{item.name} (x{item.quantity})</li>
                ))}
              </ul>
            )}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
            />
            <button className="checkout-btn" onClick={handleCheckout}>
              🚚 Proceed to Enquire
            </button>

            {cart.length > 0 && (
              <span
                className="view-cart-link"
                onClick={() => {
                  setShowCart(false);
                  navigate('/cart');
                }}
              >
                🔍 View Full Cart
              </span>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
