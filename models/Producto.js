const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      trim: true
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio debe ser mayor o igual a 0"]
    },
    categoria: {
      type: String,
      required: [true, "La categoria es obligatoria"],
      trim: true
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock debe ser mayor o igual a 0"]
    },
    estado: {
      type: String,
      enum: ["Disponible", "Agotado", "Descontinuado"],
      default: "Disponible"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Producto", productoSchema);
