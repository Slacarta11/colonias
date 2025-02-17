const express = require('express');
const cors = require('cors');
const knex = require('knex');

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
    const colonias = await db('colonias').select('*');//aquí consultará en la base de datos TODAS las colonias
    res.json(colonias);  // Operaciones de get son para ver información
});

app.post('/colonias', async (req, res) => {
    await db('colonias').insert({
        Marca: req.body.Marca,
        Nombre: req.body.Nombre,
        Materiales: req.body.Materiales
    });
    
    res.status(201).json({});
});

app.put('/colonias/:coloniaID', async (req,res) =>{
    await db("colonias").update({
      Marca: req.body.Marca,
      Nombre: req.body.Nombre,
      Materiales: req.body.Materiales,
    }).where({ID:req.params.coloniaID});

    res.status(204).json({});
});

app.delete('/colonias/:coloniaID', async (req,res) => {
    await db('colonias').del().where({ID: req.params.coloniaID})

    res.status(204).json({});
});

/*app.get('/COMENTARIOS', async (req,res) => {

});

app.post('/COMENTARIOS', async (req, res) => { //req peticion que te manda el frontend
    await db('COMENTARIOS').insert({ //res es lo que mandamos al fronted
        Descripcion: req.body.Descripcion, //frontend nos envía un texto (json--body) que va a descripcion
        Valoracion: req.body.Valoracion

    });
    res.status(200).send({message:'Comentario guardado correcamente'})
});


app.get('/colonias', async (req, res) => {
    const colonias = await db('colonias').select('coloniaId');

});

*/
app.listen(8081, () => {
    console.log('Iniciando el backend en el puerto 8081');
});