# Gestion de Productos - Examen Parcial CRUD

## 1. Nombre del proyecto
Gestion de Productos - Aplicacion Web CRUD Full Stack

## 2. Descripcion del proyecto
Este proyecto implementa una aplicacion web completa para gestionar productos mediante operaciones CRUD:
- Crear productos
- Listar productos
- Ver producto por ID
- Actualizar productos
- Eliminar productos

El backend expone una API RESTful en Node.js/Express con MongoDB/Mongoose y el frontend consume la API con HTML, CSS y JavaScript asincrono (`fetch` + `async/await`) con manipulacion dinamica del DOM.

## 3. Tecnologias utilizadas
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- cors
- nodemon
- HTML5
- CSS3
- JavaScript (ES6+)

## 4. Estructura del proyecto
```txt
Gestion-de-Productos/
|
|-- config/
|   `-- database.js
|-- controllers/
|   `-- productoController.js
|-- models/
|   `-- Producto.js
|-- routes/
|   `-- productoRoutes.js
|-- public/
|   |-- index.html
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   `-- app.js
|   `-- assets/     
|-- .env
|-- app.js
|-- package.json
|-- package-lock.json
|-- README.md
`-- server.js
```

## 5. Instalacion
Desde la raiz del proyecto:
```bash
npm install
```

## 6. Variables de entorno
En `.env` (raiz) dejar:
```env
PORT=3000
MONGO_URI=
```

Luego, antes de ejecutar, agregar la URI real de MongoDB Atlas:
```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/gestion_productos
```

## 7. Ejecucion
Desde la raiz:
```bash
npm start
```

Para desarrollo:
```bash
npm run dev
```

## 8. Frontend
El frontend se sirve automaticamente desde Express (`public/`).

Abrir en navegador:
```txt
http://localhost:3000
```

## 9. Descripcion de rutas API
Base URL:
```txt
http://localhost:3000
```

Endpoints:
- `GET /api` -> estado de la API
- `GET /api/productos` -> lista todos los productos
- `GET /api/productos/:id` -> obtiene un producto por ID
- `POST /api/productos` -> crea un producto
- `PUT /api/productos/:id` -> actualiza un producto
- `DELETE /api/productos/:id` -> elimina un producto

## 10. Ejemplos de JSON para POST y PUT
### POST `/api/productos`
```json
{
  "nombre": "Laptop Lenovo IdeaPad",
  "descripcion": "Laptop para estudio y trabajo con 8GB RAM y SSD.",
  "precio": 650,
  "categoria": "Tecnologia",
  "stock": 10,
  "estado": "Disponible"
}
```

### PUT `/api/productos/:id`
```json
{
  "nombre": "Laptop Lenovo IdeaPad Actualizada",
  "descripcion": "Laptop actualizada para estudio, trabajo y programacion.",
  "precio": 700,
  "categoria": "Tecnologia",
  "stock": 8,
  "estado": "Disponible"
}
```

## 11. Explicacion breve de la conexion con MongoDB
La conexion se configura en `config/database.js` usando `mongoose.connect(MONGO_URI)`. La URI se lee desde `.env`. Si la conexion falla, el proceso se detiene para evitar que la API arranque en estado inconsistente.

## 12. Capturas sugeridas para la entrega
Se recomienda incluir en la entrega:
1. Consola mostrando `MongoDB conectado correctamente` y `Servidor corriendo...`.
2. Resultado de `GET /api`.
3. Resultado de `GET /api/productos`.
4. Pruebas de `POST`, `PUT`, `DELETE` en Thunder Client/Postman.
5. Vista del frontend con formulario y tarjetas de productos.
6. Vista responsive en celular (dev tools).

## 13. Autor
- Estudiante: Espinal Ontaneda Adony Joshue


