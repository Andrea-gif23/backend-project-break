const Product = require('../models/Product');

// Mostrar todos los productos
const showProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(`
      <h1>Catálogo de productos</h1>
      ${products.map(product => `
        <div>
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <img src="${product.image}" alt="${product.name}" width="200" />
          <a href="/products/${product._id}">Ver detalle</a>
        </div>
      `).join('')}
    `);
  } catch (err) {
    res.status(500).send('Error al cargar los productos');
  }
};

// Mostrar el detalle de un producto
const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send(`
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <img src="${product.image}" alt="${product.name}" width="200" />
      <p>Categoría: ${product.category}</p>
      <p>Talla: ${product.size}</p>
      <p>Precio: $${product.price}</p>
      <a href="/products">Volver al catálogo</a>
    `);
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
};

// Mostrar el dashboard con todos los productos
const showDashboard = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(`
      <h1>Dashboard</h1>
      <a href="/dashboard/new">Subir nuevo producto</a>
      ${products.map(product => `
        <div>
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <img src="${product.image}" alt="${product.name}" width="200" />
          <a href="/dashboard/${product._id}">Ver detalle</a>
          <a href="/dashboard/${product._id}/edit">Editar</a>
          <form action="/dashboard/${product._id}/delete" method="POST">
            <button type="submit">Eliminar</button>
          </form>
        </div>
      `).join('')}
    `);
  } catch (err) {
    res.status(500).send('Error al cargar el dashboard');
  }
};

// Mostrar el formulario para subir un nuevo producto
const showNewProduct = (req, res) => {
  res.send(`
    <h1>Subir nuevo producto</h1>
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
};

// Crear un nuevo producto
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

// Mostrar el detalle de un producto en el dashboard
const showProductDashboard = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send(`
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <img src="${product.image}" alt="${product.name}" width="200" />
      <p>Categoría: ${product.category}</p>
      <p>Talla: ${product.size}</p>
      <p>Precio: $${product.price}</p>
      <a href="/dashboard/${product._id}/edit">Editar</a>
      <form action="/dashboard/${product._id}/delete" method="POST">
        <button type="submit">Eliminar</button>
      </form>
      <a href="/dashboard">Volver al dashboard</a>
    `);
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
};

// Mostrar el formulario para editar un producto
const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send(`
      <h1>Editar producto</h1>
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
  } catch (err) {
    res.status(500).send('Error al cargar el formulario de edición');
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
    res.redirect(`/dashboard/${req.params.productId}`);
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
};

// Eliminar un producto
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