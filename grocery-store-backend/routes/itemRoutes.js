// const express = require('express');
// const Item = require('../models/Item');
// const router = express.Router();

// // Get all items
// router.get('/', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new item
// router.post('/', async (req, res) => {
//   const item = new Item({
//     name: req.body.name,
//     price: req.body.price,
//     image: req.body.image,
//     stock: req.body.stock
//   });

//   try {
//     const newItem = await item.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // ✅ DELETE item by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedItem = await Item.findByIdAndDelete(req.params.id);
//     if (!deletedItem) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     res.json({ message: 'Item deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    stock: req.body.stock
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,           // Optional if you allow name edits
        price: req.body.price,
        image: req.body.image,         // Optional if editable
        stock: req.body.stock
      },
      { new: true } // return the updated item
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
