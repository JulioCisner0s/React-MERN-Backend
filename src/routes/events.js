import express from 'express'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.js'
import { check } from 'express-validator'
import { jwtValidator } from '../middlewares/jwt-validator.js'
import { fieldValidator } from '../middlewares/field-validator.js'
import { isDate } from '../helpers/isDate.js'

const router = express.Router()

// Todas tienen que pasar por el middleware jwtValidator
// Obetner eventos
router.get( '/', jwtValidator, getEvents )

// Crear un nuevo evento
router.post( 
  '/', 
  jwtValidator,
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    fieldValidator
  ],
  createEvent 
)

// Actualizar un evento
router.put( '/:id', jwtValidator, updateEvent )

// Eliminar un evento
router.delete( '/:id', jwtValidator, deleteEvent )

export default router;