import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const jwtValidator = ( req, res, next ) => {

  // x-token headers
  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({ ok: false, message: "No se ha proporcionado el token" });
  }

  try {

    const { uid, name } = jwt.verify( 
      token, 
      JWT_SECRET 
    );

    req.uid = uid;
    req.name = name;
    

  } catch (error) {

    console.error("Error al validar el token", error.message);
    return res.status(401).json({ ok: false, message: "Error al validar el token" });

  }
  
  next();

}