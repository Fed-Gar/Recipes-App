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
    let myRecipes = [];
    if(Recipe) {
        myRecipes = Recipe.findAll({
            where: {
                name: ingredient,
            },
        }); 
    };
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
            res.status(200).send('No hay recetas...');
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
    if(Recipe) {
        Recipe.findByPk(idReceta)
        .then(recipe => res.status(200).json(recipe))
        .catch(error => next(error));
    };
    axios.get(`${BASE_URL}/${idReceta}/information?${API_KEY}`)
        .then(recipe => {
            const { data } = recipe;
            console.log('data: ', data);
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
        })
        .catch(error => next(error));
    // res.status(200).send('No hay una receta con ese ID...');
});

/*
POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos
*/
router.post('/', (req, res, next) => {
    // const { name, summary, score, health, steps } = req.body;
    const { name, summary, score, health, steps } = req.body;
    const id = uuidv4();
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
        const [recipe, created] = data;
        if(created) return res.status(200).json('Successfully created');
        return res.status.json('The recipe already exist');
    })
    .catch(error => next(error));
});

module.exports = router;