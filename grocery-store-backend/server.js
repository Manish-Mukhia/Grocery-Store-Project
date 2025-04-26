// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// // Import routes and models
// const itemRoutes = require('./routes/itemRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const Item = require('./models/Item');  // <-- Add this import

// // Initialize express app
// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Atlas connection string
// const mongoURI = 'mongodb+srv://manishbiorev2025:LC2htEFpFNtXl7IU@cluster0.ntkw9ka.mongodb.net/grocery_store?retryWrites=true&w=majority';
// //mongodb+srv://manishbiorev2025:<db_password>@cluster0.ntkw9ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB Atlas connected');
//     // Call the function to add items when the server starts
//     addSampleItems();
//   })
//   .catch((err) => console.log('MongoDB connection error: ', err));

// // Function to add sample items
// const addSampleItems = async () => {
//   try {
//     const existingItems = await Item.countDocuments();
//     if (existingItems === 0) {
//       const items = [
//         { name: "Apple", price: 2.5, image: "https://via.placeholder.com/150" },
//         { name: "Banana", price: 1.2, image: "https://via.placeholder.com/150" },
//         { name: "Carrot", price: 3.0, image: "https://via.placeholder.com/150" },
//         { name: "Rice", price: 10.0, image: "https://via.placeholder.com/150" },
//         { name: "Pen", price: 1.5, image: "https://via.placeholder.com/150" },
//         { name: "Notebook", price: 2.0, image: "https://via.placeholder.com/150" },
//         { name: "Shampoo", price: 5.0, image: "https://via.placeholder.com/150" }
//       ];
//       await Item.insertMany(items);
//       console.log("Sample items added to the database.");
//     }
//   } catch (err) {
//     console.log("Error adding sample items: ", err);
//   }
// };

// // Use routes
// app.use('/api/items', itemRoutes);
// app.use('/api/cart', cartRoutes);

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes and models
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const Item = require('./models/Item');  // Model with stock field included

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://manishbiorev2025:LC2htEFpFNtXl7IU@cluster0.ntkw9ka.mongodb.net/grocery_store?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Atlas connected');
    // Call the function to add items when the server starts
    addSampleItems();
  })
  .catch((err) => console.log('MongoDB connection error: ', err));

// ✅ Updated sample items with stock field
const addSampleItems = async () => {
  try {
    const existingItems = await Item.countDocuments();
    if (existingItems === 0) {
      const items = [
        { name: "Apple", price: 2.5, image: "https://via.placeholder.com/150", stock: 100 },
        { name: "Banana", price: 1.2, image: "https://via.placeholder.com/150", stock: 150 },
        { name: "Carrot", price: 3.0, image: "https://via.placeholder.com/150", stock: 80 },
        { name: "Rice", price: 10.0, image: "https://via.placeholder.com/150", stock: 200 },
        { name: "Pen", price: 1.5, image: "https://via.placeholder.com/150", stock: 500 },
        { name: "Notebook", price: 2.0, image: "https://via.placeholder.com/150", stock: 250 },
        { name: "Shampoo", price: 5.0, image: "https://via.placeholder.com/150", stock: 120 }
      ];
      await Item.insertMany(items);
      console.log("✅ Sample items with stock added to the database.");
    }
  } catch (err) {
    console.log("❌ Error adding sample items: ", err);
  }
};

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
