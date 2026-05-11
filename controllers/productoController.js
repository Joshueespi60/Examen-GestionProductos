const mongoose = require("mongoose");
const Producto = require("../models/Producto");

const buildValidationMessage = (error) => {
  if (!error || !error.errors) {
    return "Datos invalidos";
  }

  return Object.values(error.errors)
    .map((item) => item.message)
    .join(" | ");
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const obtenerProductos = async (_req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Productos obtenidos correctamente",
      data: productos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de producto invalido"
      });
    }

    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Producto obtenido correctamente",
      data: producto
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: producto
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: buildValidationMessage(error)
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de producto invalido"
      });
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!productoActualizado) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: productoActualizado
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: buildValidationMessage(error)
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de producto invalido"
      });
    }

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: productoEliminado
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
