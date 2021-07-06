const { Recipe, Type } = require('../db');
const { v4: uuidv4 } = require('uuid');

const diets = ['Gluten Free', 'Ketogenic',' Vegetarian', 'Lacto-Vegetarian',
                'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];

const origin = () => {
    Recipe.findOrCreate({
        where: {name: 'Prue1'},
        defaults: {
            id: uuidv4(),
            name: 'Prue1',
            summary: 'asdi oasijd oajdosij oajsd',
            score: 95,
            health: 30,
            steps: 'fsdf sdf sdf sdf  sdfsd',
        },      
    }).then(recipe => {
        console.log('Recetas creadas...');
    })
    .catch(error => console.log(error));
    Type.findAll()
    .then(data => {
        if(!data) {
            diets.forEach(diet => {
                Type.create({
                    id: uuidv4(),
                    name: diet,
                }).then(diet => {
                    console.log('Dietas creadas...');
                })
                .catch(error => console.log(error));
            });
        } 
        console.log('Ya creado...');
    })
    .catch(error => console.log(erorr));
};
origin();

module.export = origin;