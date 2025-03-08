const express = require('express');
const cors = require('cors');
const knex = require('knex');
const { body, validationResult } = require("express-validator");


const app = express();
app.use(cors());
app.use(express.json());

const db = knex({//aqui le estamos diciendo que tenemos una base de datos, hay que crearla
    client: 'sqlite3',
    connection: {
        filename: 'colonias.db'
    },
    useNullAsDefault: true
});


app.get('/colonias', async (req, res) => { //Con esto veré los datos de las colonias en formato json
    const colonias = await db('colonias').select('*'); //aquí consultará en la base de datos TODAS las colonias
    res.status(200).json(colonias);  // Operaciones de get son para ver información
});

app.get('/colonias/:coloniaID', async (req, res) => {
  const colonias = await db("colonias").select("*").where({ id: req.params.coloniaID}).first();
  res.status(200).json(colonias);
});

app.post('/colonias', [

    body('Marca').notEmpty().withMessage('Debes indicar una marca'),
    body('Nombre').notEmpty().withMessage('Debes indicar un nombre'),
    body('Materiales').notEmpty().withMessage('Debes indicar los materiales')
    ], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    await db('colonias').insert({
        Marca: req.body.Marca,
        Nombre: req.body.Nombre,
        Materiales: req.body.Materiales
    });

    res.status(201).json({});
});

    
app.put('/colonias/:coloniaID', [
    body('Marca').notEmpty().withMessage('Debes indicar una marca'),
    body('Nombre').notEmpty().withMessage('Debes indicar un nombre'),
    body('Materiales').notEmpty().withMessage('Debes indicar los materiales')
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    await db("colonias").update({
      Marca: req.body.Marca,
      Nombre: req.body.Nombre,
      Materiales: req.body.Materiales,
    }).where({ ID: req.params.coloniaID });

    res.status(204).json({});
});


app.delete('/colonias/:coloniaID', async (req,res) => {
    await db('colonias').del().where({ID: req.params.coloniaID})

    res.status(204).json({});
});


app.get('/COMENTARIOS/:coloniaID', async (req, res) => {
    const comentarios = await db('comentarios').select('*').where({colonia_id: req.params.coloniaID});

    res.status(200).json(comentarios);
});


app.post('/COMENTARIOS/:coloniaID', [
    body('Descripcion').notEmpty().withMessage('La descripción del comentario es obligatoria'),
    body('Valoracion').notEmpty().withMessage('La valoración es obligatoria'),
], async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Descripcion, Valoracion } = req.body;

    await db('COMENTARIOS').insert({
        Descripcion,
        Valoracion,
        colonia_id: req.params.coloniaID,
    });

    res.status(201).json({ message: 'Se ha guardado su comentario' });
});

app.put("/COMENTARIOS/:comentarioID",
  [
    body("Descripcion").notEmpty().withMessage("El comentario no puede estar vacío"),
    body("Valoracion").isInt({ min: 1, max: 5 }).withMessage("La valoración debe ser un número entre 1 y 5"),
  ],
  async (req, res) => {
    console.log("Iniciando PUT");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Errores de validación:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { Descripcion, Valoracion } = req.body;
    const { comentarioID } = req.params;

    console.log("Parametros recibidos:", {
      comentarioID,
      Descripcion,
      Valoracion,
    });

    try {
      // Verifica si el comentario existe
      const comentarioExistente = await db("comentarios").where({ ID: comentarioID }).first();
      if (!comentarioExistente) {
        console.log("Comentario no encontrado");
        return res.status(404).json({ message: "Comentario no encontrado" });
      }

      console.log("Comentario encontrado, actualizando...");

      // Actualización de la base de datos
      await db("comentarios").update({ Descripcion, Valoracion }).where({ ID: comentarioID });

      console.log("Comentario actualizado correctamente");

      return res.status(200).json({ message: "Comentario modificado exitosamente" });

    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      return res.status(500).json({ message: "Hubo un error al modificar el comentario." });
    }
  }
);


app.delete('/comentarios/:comentarioID', async (req, res) => {
    const comentarioExistente = await db('comentarios').where({ID: req.params.comentarioID}).first();

    if (!comentarioExistente) {
        return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    await db('comentarios').del().where({ID: req.params.comentarioID});
    res.status(204).json({ message: 'Se ha eliminado su comentario' });
});



app.listen(8081, () => {
    console.log('Iniciando el backend en el puerto 8081');
});