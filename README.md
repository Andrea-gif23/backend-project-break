# Resumen del proyecto
He creado una tienda de ropa con dos pestañas en la cabecera: un catálogo de productos y un dashboard para el administrador. De inicio, la página lleva al catálogo de productos, para cambiar al dashboard solo habrá que pinchar en la sección y te redirige automáticamente. Los productos se almacenan en mi base de datos de MongoDB Atlas "tienda-ropa".

## Tecnologías utilizadas
- Para el Backend: Node.js, Express, Mongoose.
- Para el Frontend: HTML, CSS.
- Para la base de datos donde almacenamos los productos: MongoDB Atlas.
- Para el despliegue: Render.

## Estructura del proyecto
├── config
│ ├── db.js
├── controllers
│ ├── productController.js
├── models
│ └── Product.js
├── routes
│ └── productRoutes.js
└── index.js
├── public
│ ├── styles.css
│ ├── views 
│   │── base.html
│   │── dashboard.html
│   │── edit-product.html
│   │── new-product.html
│   │── product-detail.html
│   │── products.html
├── .env
├── .gitignore
└── package.json


## Endpoints
GET /products: Muestra todos los productos.
GET /products/:productId: Muestra el detalle de un producto.
GET /dashboard: Muestra el dashboard del administrador.
GET /dashboard/new: Muestra el formulario para subir un nuevo producto.
POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId: Muestra el detalle de un producto en el dashboard.
GET /dashboard/:productId/edit: Muestra el formulario para editar un producto.
POST /dashboard/:productId/update: Actualiza un producto.
POST /dashboard/:productId/delete: Elimina un producto.

## Para poder acceder:
En github: clonar el repositorio, para iniciar el servidor: npm start
En Render: acceder al enlace proporcionado
