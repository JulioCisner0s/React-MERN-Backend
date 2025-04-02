import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import auth from "./routes/auth.js";
import events from "./routes/events.js";

import { dbConnection } from "./db/config.js";

dotenv.config();
const PORT = process.env.PORT;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', auth);
app.use('/api/events', events)

// Esuchar peticiones
app.listen( PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});