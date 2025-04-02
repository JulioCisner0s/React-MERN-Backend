import Event from "../models/eventModel.js";

export const getEvents = async ( req, res ) => {

  const events = await Event.find().populate('user', 'name');

  res.json ({
    ok: true,
    events: events
  })

}

export const createEvent = async ( req, res ) => {

  const event = new Event( req.body );

  try {

    event.user = req.uid;

    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent
    })

  } catch (error) {

    console.log("Error al crear el evento", error.message);
    return res.status(400).json({ ok: false, message: "Error al crear el evento" });
    
  }

}

export const updateEvent = async ( req, res ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if ( ! event ) {
      return res.status(404).json({ ok: false, message: "El evento no existe por ese id" });
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({ ok: false, message: "No tienes permisos para editar este evento" });
    }

    const newEvent = {
      ...req.body,
      user: uid
    };

    const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

    res.json({
      ok: true,
      event: updatedEvent
    })

  } catch (error) {

    console.log("Error al actualizar el evento", error.message);
    return res.status(400).json({ ok: false, message: "Error al actualizar el evento" });

  }

}

export const deleteEvent = async ( req, res ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if ( ! event ) {
      return res.status(404).json({ ok: false, message: "El evento no existe por ese id" });
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({ ok: false, message: "No tienes permisos para eliminar este evento" });
    }

    const deletedEvent = await Event.findByIdAndDelete( eventId );

    res.json({
      ok: true,
      event: deletedEvent
    })

  } catch (error) {

    console.log("Error al eliminar el evento", error.message);
    return res.status(400).json({ ok: false, message: "Error al eliminar el evento" });

  }

}