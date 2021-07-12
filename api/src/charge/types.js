const { Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');   

const diets = ['gluten free', 'ketogenic', 'lacto-vegetarian','ovo-vegetarian',
                'paleo', 'pescetarian', 'primal', 'vegan', 'vegetarian', 'whole30'];

const chargeTypes = () => {
    diets.forEach(diet => {
        Type.create({
            id: uuidv4(),
            name: diet,   
        })
        .then(diet => {
            console.log(`Se creo la dieta: ${diet.dataValues.name}`, diet);
        })
        .catch(error => next(error));
    });
};

module.exports = chargeTypes;