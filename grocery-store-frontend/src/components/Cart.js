import React from 'react';

const Cart = ({ cart, editCart, deleteFromCart }) => {
  // 🔢 Calculate total quantity and total cost
  // const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  // const totalCost = cart.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0);

  return (
    <div style={{ marginTop: '40px' }}>
      {/* <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🛒 Your Cart</h2> */}

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Your cart is empty.</p>
      ) : (
        <>
          <div className="item-grid">
            {cart.map((item, index) => (
              <div key={index} className="item-card">
                <h4>{item.name}</h4>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> ${item.price?.toFixed(2) || 'N/A'}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    className="cart-btn"
                    onClick={() => editCart(item.itemId)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="cart-btn remove"
                    onClick={() => deleteFromCart(item.itemId)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Cart Summary */}
          {/* <div className="summary-card">
            <h3>🧾 Cart Summary</h3>
            <p><strong>Total Items:</strong> {cart.length}</p>
            <p><strong>Total Quantity:</strong> {totalQuantity}</p>
            <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Cart;
