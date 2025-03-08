const Product = require('../models/Product');
const path = require('path');

const baseHtml = (title, content) => `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <header>
      <h1>Tienda de Ropa</h1>
      <nav>
        <a href="/products">Catálogo</a>
        <a href="/dashboard">Dashboard</a>
      </nav>
    </header>
    <main>
      ${content}
    </main>
    <footer>
      <p>&copy; 2023 Tienda de Ropa</p>
    </footer>
  </body>
  </html>
`;


const showProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productList = products.map(product => `
      <div class="product-card">
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" width="200">
        <p>${product.description}</p>
        <a href="/products/${product._id}">Ver detalle</a>
      </div>
    `).join('');

    const html = baseHtml('Catálogo de Productos', `
      <h2>Catálogo de Productos</h2>
      <div class="product-list">
        ${productList}
      </div>
    `);

    res.send(html);
  } catch (err) {
    res.status(500).send('Error al cargar los productos');
  }
};

const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const html = baseHtml(product.name, `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" width="200">
      <p>${product.description}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <p><strong>Talla:</strong> ${product.size}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <a href="/products">Volver al catálogo</a>
    `);

    res.send(html);
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
};


const showDashboard = async (req, res) => {
  try {
    const products = await Product.find();
    const productList = products.map(product => `
      <div class="product-card">
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" width="200">
        <p>${product.description}</p>
        <a href="/dashboard/${product._id}">Ver detalle</a>
        <a href="/dashboard/${product._id}/edit">Editar</a>
        <form action="/dashboard/${product._id}/delete" method="POST">
          <button type="submit">Eliminar</button>
        </form>
      </div>
    `).join('');

    const html = baseHtml('Dashboard', `
      <h2>Dashboard</h2>
      <a href="/dashboard/new" class="btn">Subir nuevo producto</a>
      <div class="product-list">
        ${productList}
      </div>
    `);

    res.send(html);
  } catch (err) {
    res.status(500).send('Error al cargar el dashboard');
  }
};

const showNewProduct = (req, res) => {
  const html = baseHtml('Subir Nuevo Producto', `
    <h2>Subir nuevo producto</h2>
    <form action="/dashboard" method="POST">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" required><br>
      <label for="description">Descripción:</label>
      <textarea id="description" name="description" required></textarea><br>
      <label for="image">Imagen (URL):</label>
      <input type="text" id="image" name="image" required><br>
      <label for="category">Categoría:</label>
      <select id="category" name="category" required>
        <option value="Camisetas">Camisetas</option>
        <option value="Pantalones">Pantalones</option>
        <option value="Zapatos">Zapatos</option>
        <option value="Accesorios">Accesorios</option>
      </select><br>
      <label for="size">Talla:</label>
      <select id="size" name="size" required>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select><br>
      <label for="price">Precio:</label>
      <input type="number" id="price" name="price" step="0.01" required><br>
      <button type="submit">Subir producto</button>
    </form>
  `);

  res.send(html);
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    const newProduct = new Product({ name, description, image, category, size, price });
    await newProduct.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Error al crear el producto');
  }
};


const showProductDashboard = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const html = baseHtml(product.name, `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" width="200">
      <p>${product.description}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <p><strong>Talla:</strong> ${product.size}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <a href="/dashboard/${product._id}/edit">Editar</a>
      <form action="/dashboard/${product._id}/delete" method="POST">
        <button type="submit">Eliminar</button>
      </form>
      <a href="/dashboard">Volver al dashboard</a>
    `);

    res.send(html);
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
};


const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const html = baseHtml('Editar Producto', `
      <h2>Editar producto</h2>
      <form action="/dashboard/${product._id}/update" method="POST">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" value="${product.name}" required><br>
        <label for="description">Descripción:</label>
        <textarea id="description" name="description" required>${product.description}</textarea><br>
        <label for="image">Imagen (URL):</label>
        <input type="text" id="image" name="image" value="${product.image}" required><br>
        <label for="category">Categoría:</label>
        <select id="category" name="category" required>
          <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
          <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
          <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
          <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
        </select><br>
        <label for="size">Talla:</label>
        <select id="size" name="size" required>
          <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
          <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
          <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
          <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
          <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
        </select><br>
        <label for="price">Precio:</label>
        <input type="number" id="price" name="price" step="0.01" value="${product.price}" required><br>
        <button type="submit">Actualizar producto</button>
      </form>
    `);

    res.send(html);
  } catch (err) {
    res.status(500).send('Error al cargar el formulario de edición');
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
    res.redirect(`/dashboard/${req.params.productId}`);
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
};


const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
};

module.exports = {
  showProducts,
  showProductById,
  showDashboard,
  showNewProduct,
  createProduct,
  showProductDashboard,
  showEditProduct,
  updateProduct,
  deleteProduct,
};