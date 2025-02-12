const express = require('express');
const cors = require('cors'); 
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

const db=knex({//aqui le estamos diciendo que tenemos una base de datos, hay que crearla
    client: 'sqlite3',
    connection:{
        filename:'colonias.db'
    },
    useNullAsDefault: true
});


app.get('/colonias', async (req, res) => { //Con esto veré los datos de las colonias en formato json
    const colonias = await db('colonias').select('*');//aquí consultará en la base de datos TODAS las colonias
    res.json(colonias);  // Operaciones de get son para ver información
});

app.post('/colonias', async (req, res) =>{
    await db('colonias').insert({
        marca: req.body.marca,
        nombre: req.body.nombre,
        materiales: req.body.materiales
    });
    res.status(201).json({});
});

app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});