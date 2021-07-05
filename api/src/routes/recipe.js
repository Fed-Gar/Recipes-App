const { Router } = require('express');
const router = Router();
const { Recipe } = require('../db.js'); 
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const { BASE_URL, API_KEY } = process.env;

/*
GET /recipes?name="...":
Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
*/
router.get('/', (req, res, next) => {
    const { ingredient } = req.query;
    const myRecipes = Recipe.findAll({
            where: {
                name: ingredient,
            },
    });
    const apiRecipes = axios.get(`${BASE_URL}/complexSearch?query=${ingredient}&${API_KEY}`);
    Promise.all([myRecipes, apiRecipes])
        .then(results => {
            const [my, api] = results;
            const response = [...my, ...api.data.results];
            if(response.length > 0) {
                response.splice(9);
                // console.log('response: ', response);
                return res.status(200).json(response);
            };
            res.status(200).json('No hay recetas...');
        })
        .catch(error => next(error));
});

/*
GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta:
*/
router.get('/:idReceta', (req, res, next) => {
    const { idReceta } = req.params;
    if(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(idReceta)) {
        Recipe.findByPk(idReceta)
        .then(recipe => { 
            if(recipe) {
                // console.log('AAAAAAAAAA1: ', recipe);
                return res.status(200).json(recipe);
            } else {
                return res.status(200).json('La receta con ese ID no existe...');
            };
        })
        .catch(error => next(error));
    };
    axios.get(`${BASE_URL}/${idReceta}/information?${API_KEY}`)
        .then(recipe => {
            const { data } = recipe;
            // console.log('AAAAAAAAAAAA: ', data);
            if(data.title) { 
                res.status(200).json({
                    title: data.title,
                    image: data.image,
                    score: data.spoonacularScore,
                    health: data.healthScore,
                    summary: data.summary,
                    typeDish: data.dishTypes,
                    typeDiet: data.diets,
                    steps: data.analyzedInstructions[0].steps,
                });
            } else {
                res.status(200).json('La receta con ese ID no existe...');
            };
        })
        .catch(error => next(error));
});

/*
POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos
*/
router.post('/', (req, res, next) => {
    const { name, summary, score, health, steps } = req.body;
    const id = uuidv4();
    // console.log('id: ', id);
    Recipe.findOrCreate({
        where: {name: name},
        defaults: {
            id: id,
            name,
            summary,
            score,
            health,
            steps,
        },
    })
    .then(data => {
        const [_recipe, created] = data;
        if(created) return res.status(200).json('Receta creada con exito');
        return res.status(200).json('La receta ya existe');
    })
    .catch(error => next(error));
});

module.exports = router;