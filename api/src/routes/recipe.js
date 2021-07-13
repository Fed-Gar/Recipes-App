const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe } = require('../db.js'); 
const { v4: uuidv4 } = require('uuid'); 

const { BASE_URL, API_KEY } = process.env;

const UUID = new RegExp("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$");
/*
GET /recipes?name="...":
Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query parameter.
Si no existe ninguna receta mostrar un mensaje adecuado
*/
router.get('/', (req, res, next) => {
  const { ingredient, toget } = req.query;
  if(!ingredient) {
    const db = Recipe.findAll();
    const api = axios.get(`${BASE_URL}/complexSearch?number=${toget}&${API_KEY}`);
    Promise.all([db, api])
    .then(data => {
      let [ db, api ] = data;
      const tot = api.data.results.length;
      if(tot > 0) {
        api.data.results.forEach((recipe, i) => {
          axios.get(`${BASE_URL}/${recipe.id}/information?${API_KEY}`)
          .then(api => {
            const aux = {
              name: api.data.title,
              img: api.data.image,
              typeDiet: api.data.diets,
            };
            db.push(aux);
            if(i === (tot - 1)) {
              if(db.length > 0) {
                return res.status(200).json(db);
              };
              res.status(200).json('No hay recetas...');
            }
          })
          .catch(error => next(error));
        });
      };
    })
    .catch(error => next(error));
  } else {
      const db = Recipe.findAll({where: { name: ingredient}});
      const api = axios.get(`${BASE_URL}/complexSearch?query=${ingredient}&${API_KEY}`);
      Promise.all([db, api])
      .then(data => {
        const [ db, api ] = data;
        const results = [...db, ...api.data.results];
        if(results.length > 0) {
          results.splice(9);
          return res.status(200).json(results);
        };
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
  if(UUID.test(idReceta)) {
    Recipe.findByPk(idReceta)
    .then(db => {
      return res.status(200).json(db);
    })
    .catch(error => next(error));
  } else {
      axios.get(`${BASE_URL}/${idReceta}/information?${API_KEY}`)
      .then(api => {
        if(api.data.title) {
          const { data } = api;
          let steps = '';
          if(data.analyzedInstructions.length > 0) {
            let aux = data.analyzedInstructions[0].steps;
            aux.forEach((data, i) => {
              steps = steps + `${i + 1})` + data.step;
            });
          }; 
          const recipe = {
            title: data.title,
            image: data.image,
            score: data.spoonacularScore,
            health: data.healthScore,
            summary: data.summary,
            typeDish: data.dishTypes,
            typeDiet: data.diets,
            steps: steps,
          };
          return res.status(200).json(recipe);
        }; 
      })
      .catch(error => next(error));
    }; 
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
    console.log('ID: ', data); // f24cbe9f-6171-40a9-b478-079a309aa1d5
    const [_recipe, created] = data;
    if(created) return res.status(200).json('Receta creada con exito...');
    return res.status(200).json('La receta ya existe...');
  })
  .catch(error => next(error));
});

module.exports = router;