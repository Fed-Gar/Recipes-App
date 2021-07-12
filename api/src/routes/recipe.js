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
  // cambiar a prromise all
  const { ingredient } = req.query;
  if(!ingredient) {
    Recipe.findAll()
    .then(recipes => {
      res.status(200).json(recipes);
  })
    .catch(error => next(error));
  } else {
      axios.get(`${BASE_URL}/complexSearch?query=${ingredient}&${API_KEY}`)
      .then(api => {
        const { results } = api.data; 
        if(results.length > 0) {
          results.splice(9);
          return res.status(200).json(results);
        }
        res.status(200).json('No hay recetas...');   
      })
      .catch(error => next(error));
  };
});
/*
GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta:
*/
router.get('/:idReceta', (req, res, next) => {
  const { idReceta } = req.params;
  const db = Recipe.findByPk(idReceta);
  const api = axios.get(`${BASE_URL}/${idReceta}/information?${API_KEY}`);
  Promise.all([db, api])
  .then(data => {
    const [ db, api ] = data;
    if(db) {
      return res.status(200).json(db);
    } else {
        if(api.data.title) {
          const { data } = api;
          let steps = '';
          if(data.analyzedInstructions.length > 0) {
            let aux = data.analyzedInstructions[0].steps;
            aux.forEach((data, i) => {
              steps = steps + `${i + 1})` + data.step;
            });
          }; 
          res.status(200).json({
            title: data.title,
            image: data.image,
            score: data.spoonacularScore,
            health: data.healthScore,
            summary: data.summary,
            typeDish: data.dishTypes,
            typeDiet: data.diets,
            steps: steps,
          });
        } else {
            res.status(200).json('No existe esa receta...');
        };
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
  Recipe.findOrCreate({
    where: {name: name},
    defaults: {
      id: uuidv4(),
      name,
      img,
      summary,
      score,
      health,
      steps,
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