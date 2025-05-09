const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const products = [
  {
    _id: '1',
    name: 'Elegant Floral Hair Clip',
    image: '/images/floral-clip.jpg',
    description:
      'Beautiful floral hair clip made with high-quality materials. Perfect for special occasions or everyday wear.',
    brand: 'ElegantAccessories',
    category: 'Hair Clips',
    price: 19.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: '2',
    name: 'Silk Scrunchie Set',
    image: '/images/silk-scrunchie.jpg',
    description:
      'Set of 3 silk scrunchies in different colors. Gentle on hair and prevents breakage.',
    brand: 'SilkLuxe',
    category: 'Scrunchies',
    price: 14.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'Pearl Headband',
    image: '/images/pearl-headband.jpg',
    description:
      'Elegant pearl headband that adds a touch of sophistication to any outfit.',
    brand: 'PearlGlam',
    category: 'Headbands',
    price: 29.99,
    countInStock: 5,
    rating: 4.8,
    numReviews: 15,
  },
  {
    _id: '4',
    name: 'Boho Hair Pins Set',
    image: '/images/boho-pins.jpg',
    description:
      'Set of 6 bohemian-style hair pins with various designs. Perfect for creating unique hairstyles.',
    brand: 'BohoChic',
    category: 'Hair Pins',
    price: 24.99,
    countInStock: 11,
    rating: 4.2,
    numReviews: 9,
  },
  {
    _id: '5',
    name: 'Velvet Hair Bow',
    image: '/images/velvet-bow.jpg',
    description:
      'Luxurious velvet hair bow that adds a touch of elegance to any hairstyle.',
    brand: 'VelvetLuxe',
    category: 'Hair Bows',
    price: 12.99,
    countInStock: 7,
    rating: 4.3,
    numReviews: 10,
  },
  {
    _id: '6',
    name: 'Crystal Hair Comb',
    image: '/images/crystal-comb.jpg',
    description:
      'Stunning crystal hair comb perfect for weddings, proms, or other special events.',
    brand: 'CrystalGlow',
    category: 'Hair Combs',
    price: 39.99,
    countInStock: 0,
    rating: 4.9,
    numReviews: 18,
  },
];

const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$eBz0VGjOOJnXOgWqQO7QVuX5JYmW.j7BzJqJVqQz7Yx3.GMdVrOLW', // 123456
    isAdmin: true,
  },
  {
    _id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '$2a$10$eBz0VGjOOJnXOgWqQO7QVuX5JYmW.j7BzJqJVqQz7Yx3.GMdVrOLW', // 123456
    isAdmin: false,
  },
];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  
  if (user) {
    // In a real app, we would compare hashed passwords
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: 'sample-token-123456',
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  
  if (users.find((u) => u.email === email)) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  
  const newUser = {
    _id: String(users.length + 1),
    name,
    email,
    password, // In a real app, we would hash this
    isAdmin: false,
  };
  
  users.push(newUser);
  
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: 'sample-token-123456',
  });
});

// Home route
app.get('/', (req, res) => {
  res.send('Hair Accessories Shop API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
