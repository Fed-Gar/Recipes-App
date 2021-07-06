const { Recipe, Type } = require('../db');
const { v4: uuidv4 } = require('uuid');

const diets = ['Gluten Free', 'Ketogenic',' Vegetarian', 'Lacto-Vegetarian',
                 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];

const origin = () => {
    Recipe.create({
        id: uuidv4(),
        name: 'La Pomarola',
        summary: 'asdi oasijd oajdosij oajsd',
        score: 95,
        health: 30,
        steps: 'fsdf sdf sdf sdf  sdfsd',       
    }).then(recipe => {
        console.log(recipe.toJSON());
        return recipe;
    });
    diets.forEach(diet => {
        Type.create({
            id: uuidv4(),
            name: diet,
        }).then(diet => {
            console.log(diet.toJSON());
            return diet;
        });
    });
};
origin();

module.export = origin;