const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
      throw new Error("La variable MONGO_URI no esta definida en .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
