const { Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');   

const diets = ['gluten free', 'ketogenic', 'lacto-vegetarian','ovo-vegetarian',
                'paleo', 'pescetarian', 'primal', 'vegan', 'vegetarian', 'whole30'];

const chargeTypes = () => {
    Type.findAll()
    .then(response => {
        if(response.length < 1) {
            diets.forEach(diet => {
                Type.create({
                    id: uuidv4(),
                    name: diet,     
                })
            .then(data => {
                console.log(`Se creo la dieta: ${data.dataValues.name}`, data);
            })
            .catch(error => console.log(error));
            }); 
        }
    })
};

module.exports = chargeTypes;