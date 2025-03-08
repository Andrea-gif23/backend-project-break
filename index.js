const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', productRoutes);

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});