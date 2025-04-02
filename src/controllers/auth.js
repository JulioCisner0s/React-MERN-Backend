import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";

export const createUser = async ( req, res ) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email: email });

    if ( user ) {
      return res.status(400).json({ ok: false, message: "El usuario ya existe con ese correo" });
    }

    user = new User( req.body );

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    // Generar el JWT
    const token = await generateToken( user._id, user.name );

    res.status(201).json({ 
      ok: true, 
      uid: user._id, 
      name: user.name,
      token: token
    });

  } catch (error) {

    console.error("Error al crear el usuario", error.message);
    res.status(500).json({ ok: false, message: "Error al crear el usuario" });

  }

}

export const loginUser = async ( req, res ) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email: email });

    if ( !user ) {
      return res.status(400).json({ ok: false, message: "El usuario no existe con ese email" });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status(400).json({ ok: false, message: "La contraseña es incorrecta" });
    }

    // Generar el JWT
    const token = await generateToken( user._id, user.name );


    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token: token
    })


  } catch (error) {

    console.error("Error al iniciar sesion", error.message);
    res.status(500).json({ ok: false, message: "Error al iniciar sesion" });

  }
  
}

export const renewToken = async ( req, res ) => {

  const { uid, name } = req;

  // Generar un nuevo JWT y retornarlo
  const token = await generateToken( uid, name );

  try {

    res.json({ 
      ok: true, 
      uid: uid,
      name: name,
      token: token
    });

  } catch (error) {

    console.error("Error al renovar el token", error.message);
    res.status(500).json({ ok: false, message: "Error al renovar el token" });

  }
}