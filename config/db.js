const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Eliminamos las opciones obsoletas
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Detener la aplicación si hay un error de conexión
  }
};

module.exports = connectDB;