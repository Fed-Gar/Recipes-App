const { Router } = require('express');
const router = Router();
const { Recipe } = require('../db.js'); 
const axios = require('axios');

const { BASE_URL, API_KEY } = process.env;
let ID = 1;

router.get('/', (req, res, next) => {
  // carga la DB
  const { number } = req.query;
  axios.get(`${BASE_URL}/complexSearch?${API_KEY}&number=${number}`)
  .then(response => {
    const { data } = response;
    data.results.forEach(recipe => {
      axios.get(`${BASE_URL}/${recipe.id}/information?${API_KEY}`)
      .then(response => {
        const { data } = response;
        let steps = '';
        if(data.analyzedInstructions.length > 0) {
          let aux = data.analyzedInstructions[0].steps;
          aux.forEach((data, i) => {
            steps = steps + `${i + 1})` + data.step;
          });
        };
        Recipe.findOrCreate({
          where: {
            id: data.id,
          },
          defaults: {
            id: data.id,
            name: data.title,
            summary: data.summary,
            img: data.image,
            score: data.spoonacularScore,
            health: data.healthScore,
            steps: steps,
            created: false,
          },
        })
        .catch(error => next(error));
      })
      .catch(error => next(error));
    });
  })
  .catch(error => next(error)); 
  console.log('Recetas cargadas...');
  res.status(200).send('Ok');
});
//---------------------------------------------------------------------------------------------
// router.get('/', (_req, res, next) => {
//   // carga la DB
//       Recipe.findAll()
//       .then(recipes => {
//         console.log('Recetas cargadas...');
//         res.status(200).json(recipes);
//       })
//       .catch(error => (next));
// });
//---------------------------------------------------------------------------------------------
/*
GET /recipes?name="...":
Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
*/
router.get('/home', (req, res, next) => {
  const { ingredient, number } = req.query;
  const myRecipes = Recipe.findAll({
              where: {
                name: ingredient,
              },
  });
  const apiRecipes = axios.get(`${BASE_URL}/complexSearch?query=${ingredient}&${API_KEY}&number=${number}`);
  Promise.all([myRecipes, apiRecipes])
  .then(results => {
    const [my, api] = results;
    const response = [...my, ...api.data.results];
    if(response.length > 0) {
      response.splice(9);
      return res.status(200).json(response);
    }
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
  Recipe.findByPk(idReceta)
  .then(recipe => { 
    if(recipe) {
      return res.status(200).json(recipe);
    } else {
        return res.status(200).json('La receta con ese ID no existe...');
    };
  })
  .catch(error => next(error));
  axios.get(`${BASE_URL}/${idReceta}/information?${API_KEY}`)
  .then(recipe => {
    const { data } = recipe;
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
  const { name, summary, score, health, steps, img } = req.body;
  const id = ID;
  ID++;
  Recipe.findOrCreate({
    where: {name: name},
    defaults: {
      id: id,
      name,
      img,
      summary,
      score,
      health,
      steps,
      created: true,
    },
  })
  .then(data => {
    const [_recipe, created] = data;
    if(created) return res.status(200).json('Receta creada con exito...');
    return res.status(200).json('La receta ya existe...');
  })
  .catch(error => next(error));
});

module.exports = router;