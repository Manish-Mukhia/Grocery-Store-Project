import React from 'react';
import Cart from './Cart';

const FullCart = ({ cart, editCart, deleteFromCart }) => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0);

  return (
    <div style={{ padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🛒 Your Cart</h2>

      <Cart cart={cart} editCart={editCart} deleteFromCart={deleteFromCart} />

      {cart.length > 0 && (
        <div className="summary-card" style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center'
        }}>
          <h3>🧾 Cart Summary</h3>
          <p><strong>Total Items:</strong> {cart.length}</p>
          <p><strong>Total Quantity:</strong> {totalQuantity}</p>
          <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default FullCart;
