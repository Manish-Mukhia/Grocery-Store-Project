import React, { useState } from 'react';
import axios from 'axios';
import Toast from './Toast'; // ✅ Import Toast

const ItemList = ({ items }) => {
  const [quantities, setQuantities] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: parseInt(value) || 1
    });
  };

  const handleEnquiry = (itemId) => {
    const selectedItem = items.find(item => item._id === itemId);
    if (!selectedItem) return;

    const quantity = quantities[itemId] || 1;

    const enquiry = {
      userId: 'user1',
      items: [{ itemId: selectedItem._id, name: selectedItem.name, quantity }],
      address: 'N/A'
    };

    axios.post('http://localhost:5000/api/cart/add', enquiry)
      .then(() => {
        setToastMessage('📩 Enquiry sent successfully!');
        setTimeout(() => setToastMessage(''), 2000); // Hide after 2 seconds
      })
      .catch((error) => {
        console.log('Error sending enquiry:', error);
        setToastMessage('❌ Failed to send enquiry');
        setTimeout(() => setToastMessage(''), 2000);
      });
  };

  return (
    <div className="item-grid">
      {toastMessage && <Toast message={toastMessage} />}
      
      {items.map(item => (
        <div key={item._id} className="item-card">
          <img src={item.image} alt={item.name} className="item-image" />
          <h3>{item.name}</h3>
          <p><strong>Price:</strong> ${item.price}</p>
          <p style={{ color: item.stock > 0 ? 'green' : 'red' }}>
            {item.stock > 0 ? `In Stock: ${item.stock}` : 'Out of Stock'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <input
              type="number"
              min="1"
              value={quantities[item._id] || 1}
              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
              style={{
                width: '60px',
                padding: '6px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />

            <button
              className="add-btn themed"
              onClick={() => handleEnquiry(item._id)}
            >
              📩 Send Enquiry
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
