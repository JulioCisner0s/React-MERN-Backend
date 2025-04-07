import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import auth from "./routes/auth.js";
import events from "./routes/events.js";

import { dbConnection } from "./db/config.js";

dotenv.config();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/api/events', events);

app.use(express.static(path.join(__dirname, 'public')));
// Esuchar peticiones
app.listen( PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});