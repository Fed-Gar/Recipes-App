const { Recipe } = require('../db.js'); 
const axios = require('axios');

const { BASE_URL, API_KEY } = process.env;

const chargeRecipes = (toEnter = 2) => {
  // carga la DB
  axios.get(`${BASE_URL}/complexSearch?${API_KEY}&number=${toEnter}`)
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
        .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
    });
  })
  .catch(error => console.log(error)); 
  console.log('Recetas cargadas...');
};

module.exports = chargeRecipes;