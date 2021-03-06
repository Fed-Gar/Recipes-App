const { Router } = require('express');
const router = Router();
const axios = require('axios');

const { Recipe } = require('../db.js'); 
const { Type } = require('../db.js'); 

const { v4: uuidv4 } = require('uuid'); 

const { BASE_URL, API_KEY } = process.env;

const UUID = new RegExp("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$");
/*
GET /recipes/type?diet="..."
*/
router.get('/type', (req, res, next) => {
  const { diet, toget } = req.query;
  const db = Recipe.findAll({
    include: {
      model: Type,
      where: {
        name: diet,
      },
    },
  }); 
  const api = axios.get(`${BASE_URL}/complexSearch?diet=${diet}&number=${toget}&addRecipeInformation=true&${API_KEY}`);
  Promise.all([db, api])
  .then(data => {
    const [db, api] = data;
    if(api.data.number > 0) {
      api.data.results.forEach(recipe => {
        const aux = {
          id: recipe.id,
          name: recipe.title,
          img: recipe.image,
          score: recipe.spoonacularScore,
          typeDiet: recipe.diets,
        };
        db.push(aux);
      });
      return res.status(200).json(db);
    } else if(db.length > 0) return res.status(200).json(db);
      else {res.status(200).json('No hay recetas...')};
  })
  .catch(error => next(error));
});
/*
GET /recipes?name="..."
*/
router.get('/', (req, res, next) => {
  const { name, toget } = req.query;
  if(!name) {
    const db = Recipe.findAll({
      include: {
        model: Type,
      },
    });
    const api = axios.get(`${BASE_URL}/complexSearch?number=${toget}&addRecipeInformation=true&${API_KEY}`);
    Promise.all([db, api])
    .then(data => {
      let [ db, api ] = data;
      if(api.data.number > 0) {
        api.data.results.forEach(recipe => {
          const aux = {
            id: recipe.id,
            name: recipe.title,
            img: recipe.image,
            score: recipe.spoonacularScore,
            typeDiet: recipe.diets,
          };
          db.push(aux);
        });
        return res.status(200).json(db);
      } else if(db.length > 0) return res.status(200).json(db);
        else {res.status(200).json('No hay recetas...')};
    })
    .catch(error => next(error));
  } else {
      const title = name.toLowerCase();
      const db = Recipe.findAll({
        where: { 
          name: title, 
        },
        include: {
          model: Type,
        },
      });
      const api = axios.get(`${BASE_URL}/complexSearch?query=${name}&number=${toget}&addRecipeInformation=true&${API_KEY}`); 
      Promise.all([db, api])
      .then(data => {
        let [ db, api ] = data;
        if(api.data.number > 0) {
          api.data.results.forEach(recipe => {
            if(recipe.title.toLowerCase().includes(title)) {
              const aux = {
              id: recipe.id,
              name: recipe.title.toLowerCase(),
              img: recipe.image,
              score: recipe.spoonacularScore,
              typeDiet: recipe.diets,
              };
              db.push(aux);
            };
          });
          db.splice(9);
          return res.status(200).json(db);
        } else if(db.length > 0) {
            db.splice(9);
            return res.status(200).json(db); 
        } else {res.status(200).json('No hay recetas...')};
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
    Recipe.findAll({
      where: {
        id: idReceta,
      },
      include: {
        model: Type,
      },
    })
    .then(db => {
      if(db.length > 0) return res.status(200).json(db[0]);
      return res.status(200).json('No hay recetas...');
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
            summary: data.summary.replace(/<[^>]*>?/g, ''),
            typeDish: data.dishTypes,
            typeDiet: data.diets,
            steps: steps,
          };
          return res.status(200).json(recipe);
        } else {
            return res.status(200).json('No hay recetas...');
        }; 
      })
      .catch(error => next(error));
    }; 
});
/*
POST /recipe
*/
router.post('/', (req, res, next) => {
  const { state, types } = req.body;
  Recipe.findOrCreate({
    where: {name: state.name},
    defaults: {
      id: uuidv4(),
      name: state.name.toLowerCase(),
      summary: state.summary,
      score: state.score,
      health: state.health,
      steps: state.steps,
    },
  })
  .then(data => {
    const [recipe, created] = data;
    if(created) {
      types.diets.forEach(diet => {
        if(diet.isChecked) recipe.addType(diet.id);
      });
      return res.status(200).json(recipe);
    };
    return res.status(200).json('La receta ya existe...');
  })
  .catch(error => next(error));
});

module.exports = router;