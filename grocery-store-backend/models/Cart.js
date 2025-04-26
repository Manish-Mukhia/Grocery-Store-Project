const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  address: { type: String, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
