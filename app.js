const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/database");
const productoRoutes = require("./routes/productoRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "API RESTful de Gestión de Productos funcionando correctamente"
  });
});

app.use("/api/productos", productoRoutes);

app.use("/api", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Ruta de API no encontrada"
  });
});

module.exports = app;
