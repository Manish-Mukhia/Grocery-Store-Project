const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST request to add items to the cart (always save new enquiry ✅)
router.post('/add', async (req, res) => {
  console.log('Received cart data:', req.body);  // Debug log

  const { userId, items, address } = req.body;

  try {
    const cart = new Cart({ userId, items, address }); // ✅ Always create new cart
    await cart.save();
    res.status(201).json({ message: 'Enquiry added successfully', cart });
  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).json({ message: 'Error processing the cart' });
  }
});

// Admin: Get all carts
router.get('/admin', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Delete cart by userId
router.delete('/admin/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteMany({ userId }); // ✅ Use deleteMany instead of deleteOne (optional but safer)
    res.status(200).json({ message: `Cart(s) for user ${userId} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
