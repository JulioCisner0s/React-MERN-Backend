import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = ( uid, name ) => {

  return new Promise( ( resolve, reject ) => {

    const payload = { uid, name };

    jwt.sign( payload, JWT_SECRET, { 
      expiresIn: "4h" 
    }, ( err, token ) => {

      if ( err ) {
        reject('Error al generar el token');
      }

      resolve( token );

    });

  });

};