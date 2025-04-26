import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [carts, setCarts] = useState([]);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', image: '', stock: '' });
  const [activeTab, setActiveTab] = useState('enquiry');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://grocery-store-project.onrender.com/api/cart/admin')
      .then((response) => setCarts(response.data))
      .catch((error) => console.log('Error fetching cart data:', error));

    axios.get('https://grocery-store-project.onrender.com/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.log('Error fetching items:', error));
  }, []);

  const deleteCart = (userId) => {
    axios.delete(`https://grocery-store-project.onrender.com/api/cart/admin/${userId}`)
      .then(() => {
        alert(`Cart for user ${userId} deleted`);
        setCarts(carts.filter(cart => cart.userId !== userId));
      })
      .catch((error) => console.log('Error deleting cart:', error));
  };

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addNewItem = () => {
    if (!newItem.name || !newItem.price || !newItem.stock || !newItem.image) {
      return alert('Please fill all fields exactly: name, price, image, stock');
    }

    const formattedItem = {
      name: newItem.name,
      price: parseFloat(newItem.price),
      image: newItem.image,
      stock: parseInt(newItem.stock)
    };

    axios.post('https://grocery-store-project.onrender.com/api/items', formattedItem)
      .then(() => {
        alert('Item added successfully');
        setNewItem({ name: '', image: '', price: '', stock: '' });
        return axios.get('https://grocery-store-project.onrender.com/api/items');
      })
      .then((response) => setItems(response.data))
      .catch((err) => console.log('Error adding item:', err));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const updateItem = (id) => {
    const item = items.find(i => i._id === id);
    axios.put(`https://grocery-store-project.onrender.com/api/items/${id}`, {
      price: parseFloat(item.price),
      stock: parseInt(item.stock)
    })
      .then(() => alert('Item updated!'))
      .catch(err => console.log('Error updating item:', err));
  };

  const deleteItem = (id) => {
    axios.delete(`https://grocery-store-project.onrender.com/api/items/${id}`)
      .then(() => {
        setItems(items.filter(i => i._id !== id));
        alert('Item deleted!');
      })
      .catch(err => console.log('Error deleting item:', err));
  };

  return (
    <div className="admin-dashboard" style={{ display: 'flex' }}>
      
      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
        style={{
          width: sidebarOpen ? '250px' : '70px',
          background: '#212529',
          padding: '20px 10px',
          height: '100vh',
          transition: 'width 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: sidebarOpen ? 'flex-start' : 'center'
        }}
      >
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            marginBottom: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: '#fff'
          }}
        >
          {sidebarOpen ? '⬅️' : '➡️'}
        </button>

        {/* 🏠 Home Button */}
        <button
          onClick={() => navigate('/')}
          className="sidebar-btn"
          style={{ marginBottom: '20px' }}
        >
          🏠 {sidebarOpen && 'Home'}
        </button>

        {sidebarOpen && <h2 style={{ color: '#fff', marginBottom: '20px' }}>📊 Dashboard</h2>}

        <button onClick={() => setActiveTab('enquiry')} className={`sidebar-btn ${activeTab === 'enquiry' ? 'active' : ''}`}>
          📜 {sidebarOpen && `Enquiry History (${carts.length})`}
        </button>

        <button onClick={() => setActiveTab('additem')} className={`sidebar-btn ${activeTab === 'additem' ? 'active' : ''}`}>
          ➕ {sidebarOpen && 'Add New Item'}
        </button>

        <button onClick={() => setActiveTab('manage')} className={`sidebar-btn ${activeTab === 'manage' ? 'active' : ''}`}>
          🧰 {sidebarOpen && `Manage Items (${items.length})`}
        </button>

        <button onClick={() => {localStorage.removeItem('isAdminLoggedIn'); window.location.href = '/admin';}} className="sidebar-btn logout">
          🚪 {sidebarOpen && 'Logout'}
        </button>

      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flexGrow: 1, padding: '20px' }}>
        <h1 className="title">🛠️ Admin Dashboard</h1>

        {/* Enquiry Tab */}
        {activeTab === 'enquiry' && (
          <div className="admin-section">
            {carts.length === 0 ? (
              <p>No enquiries found.</p>
            ) : (
              <div className="admin-grid">
                {carts.map((cart) => (
                  <div key={cart.userId} className="admin-card">
                    <h3>👤 User: {cart.userId}</h3>
                    <p><strong>📍 Address:</strong> {cart.address}</p>
                    <ul>
                      {cart.items.map((item, index) => (
                        <li key={index}>🛒 {item.name} (Quantity: {item.quantity})</li>
                      ))}
                    </ul>
                    <button className="admin-btn delete" onClick={() => deleteCart(cart.userId)}>
                      🗑 Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Item Tab */}
        {activeTab === 'additem' && (
          <div className="admin-section">
            <div className="admin-card">
              <input name="name" placeholder="Name" value={newItem.name} onChange={handleNewItemChange} />
              <input name="price" type="number" placeholder="Price" value={newItem.price} onChange={handleNewItemChange} />
              <input name="image" placeholder="Image URL" value={newItem.image} onChange={handleNewItemChange} />
              <input name="stock" type="number" placeholder="Stock" value={newItem.stock} onChange={handleNewItemChange} />
              <button className="admin-btn" onClick={addNewItem}>➕ Add Item</button>
            </div>
          </div>
        )}

        {/* Manage Items Tab */}
        {activeTab === 'manage' && (
          <div className="admin-section">
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td><input type="number" value={item.price} onChange={(e) => handleItemChange(item._id, 'price', e.target.value)} /></td>
                      <td><input type="number" value={item.stock} onChange={(e) => handleItemChange(item._id, 'stock', e.target.value)} /></td>
                      <td>
                        <button onClick={() => updateItem(item._id)}>💾 Save</button>
                        <button onClick={() => deleteItem(item._id)} className="delete">🗑 Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
