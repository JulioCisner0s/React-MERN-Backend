import express from "express";
import { createUser, loginUser, renewToken } from "../controllers/auth.js";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/field-validator.js";
import { jwtValidator } from "../middlewares/jwt-validator.js";

const router = express.Router();

router.post(
  "/new",
  [ // middleware
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe de contener al menos 8 caracteres').isLength({ min: 8 }),
    fieldValidator
  ],
  createUser );

router.post(
  "/",
  [ // middleware
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe de contener al menos 8 caracteres').isLength({ min: 8 }),
    fieldValidator
  ],
  loginUser );

router.get("/renew", jwtValidator, renewToken );

export default router;