import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = async () => {
  try {

    await mongoose.connect(process.env.DB_URL);

    console.log("DB conectado");


  } catch (error) {
    console.error("Error al conectar con la base de datos", error.message);
    throw new Error("Error al conectar con la base de datos");

  }
}