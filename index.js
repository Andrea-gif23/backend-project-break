const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para leer el body de las peticiones
app.use(express.urlencoded({ extended: true }));

// Configurar el motor de plantillas
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Usar las rutas de productos
app.use('/', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});