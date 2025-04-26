// const mongoose = require('mongoose');

// // Define the schema for an Item
// const itemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   image: String,
// });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  stock: { type: Number, required: true }  // ✅ MUST BE PRESENT
});

module.exports = mongoose.model('Item', ItemSchema);
