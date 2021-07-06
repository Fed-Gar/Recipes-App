const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Type } = require('../db.js'); 

const { BASE_URL, API_KEY } = process.env;

/*
 GET /types:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, 
deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
*/
router.get('/', (req, res, next) => {
    Type.findAll()
    .then(diets => {
        // console.log('DIETS: ', diets);
        res.status(200).json(diets);
    })
    .catch(error => next(error));
});

module.exports = router;