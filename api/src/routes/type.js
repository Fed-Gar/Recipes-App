const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js'); 
const { v4: uuidv4 } = require('uuid');

const diets = ['Gluten Free', 'Ketogenic',' Vegetarian', 'Lacto-Vegetarian',
                'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];

router.post('/', (_req, res, next) => {
    diets.forEach(diet => {
        Type.findOrCreate({
            where: {
                name: diet,
            },
            default: {
                id: uuidv4(),
                name: diet,   
            },
        })
        .then(diet => {
            const [_type, created] = diet;
            if(created) console.log(`Se creo la dieta: ${diet[0].dataValues.name}`, diet);
        })
        .catch(error => next(error));
    });
    console.log('Dietas cargadas...');
    res.status(200).json('OK');
});          
/*
 GET /types:
Obtener todos los tipos de dieta posibles
*/
router.get('/', (_req, res, next) => {
    const { name } = req.query;
    if(!name) {
        Type.findAll()
        .then(diets => {
            res.status(200).json(diets);
        })
        .catch(error => next(error));
    } else {
        Type.findAll({
            where: {
                name: name
            },
        })
        .then(diet => {
            res.status(200).json(diet);
        })
        .catch(error => next(error));
    };
});

module.exports = router;