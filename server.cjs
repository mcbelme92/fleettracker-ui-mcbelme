// server.js
const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Cors: permite X-Total-Count
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// logger y middlewares por defecto (incluye CORS ya)
server.use(jsonServer.defaults());

// Aquí dejamos que json-server maneje todas las rutas
server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`JSON Server corriendo en http://localhost:${port}`);
});
