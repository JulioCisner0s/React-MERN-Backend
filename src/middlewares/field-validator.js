import { validationResult } from "express-validator";

export const fieldValidator = ( req, res, next ) => {

  // Validar que el nombre no este vacio
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }
  
  next();

}