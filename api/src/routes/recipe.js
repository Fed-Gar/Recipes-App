const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe } = require('../db.js'); 
const { v4: uuidv4 } = require('uuid'); 

const { BASE_URL, API_KEY } = process.env;

const UUID = new RegExp("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$");
/*
GET /recipes?name="..."
*/
router.get('/', (req, res, next) => {
  const { name, toget } = req.query;
  if(!name) {
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
              id: api.data.id,
              name: api.data.title,
              img: api.data.image,
              score: api.data.spoonacularScore,
              typeDiet: api.data.diets,
            };
            db.push(aux);
            if((i + 1) === tot) {
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
      const db = Recipe.findAll({where: { name: name }});
      const api = axios.get(`${BASE_URL}/complexSearch?query=${name}&number=${toget}&${API_KEY}`); // acordarme de sacar number aca y en get recipes
      Promise.all([db, api])
      .then(data => {
        const [ db, api ] = data;
        console.log('DB: ', db);
        const tot = api.data.results.length;
        if(tot > 0) {
          api.data.results.forEach((recipe, i) => {
            axios.get(`${BASE_URL}/${recipe.id}/information?${API_KEY}`)
            .then(api => {
              const aux = {
                id: api.data.id,
                name: api.data.title,
                img: api.data.image,
                score: api.data.spoonacularScore,
                typeDiet: api.data.diets,
              };
              db.push(aux);
              if((i + 1) === tot) {
                if(db.length > 0) {
                  db.splice(9);
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
    };
});
/*
GET /recipes/{idReceta}
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
            name: data.title,
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
GET /recipes/type?type="..."
*/
router.get('/type', (req, res, next) => {
  const { diet, toget } = req.query;
  const db = Recipe.findAll(); // buscar por la dieta
  const api = axios.get(`${BASE_URL}/complexSearch?diet=${diet}&number=${toget}&${API_KEY}`);
  Promise.all([db, api])
  .then(data => {
    const [ db, api ] = data;
    const results = [...db, ...api.data.results];
    if(results.length > 0) {
      return res.status(200).json(results);
    };
    res.status(200).json('No hay recetas...');
  })
  .catch(error => next(error));
});
/*
POST /recipe
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
    // console.log('ID: ', data); // f24cbe9f-6171-40a9-b478-079a309aa1d5
    const [recipe, created] = data;
    console.log('RECIPE', recipe)
    if(created) return res.status(200).json(recipe);
    return res.status(200).json('La receta ya existe...');
  })
  .catch(error => next(error));
});

module.exports = router;