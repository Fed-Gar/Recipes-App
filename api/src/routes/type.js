const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js'); 
const { v4: uuidv4 } = require('uuid');

const diets = ['gluten free', 'ketogenic','vegetarian', 'lacto-vegetarian',
                'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'whole30'];

router.post('/', (_req, res, next) => {
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
    res.status(200).json('OK');
});          
/*
 GET /types:
Obtener todos los tipos de dieta posibles
*/
router.get('/', (req, res, next) => {
    const { name } = req.query;
    if(!name) {
        Type.findAll()
        .then(diets => {
            res.status(200).json(diets);
        })
        .catch(error => next(error));
    } else {
        const search = name.toLowerCase();
        Type.findAll({
            where: {
                name: search,
            },
        })
        .then(diet => {
            res.status(200).json(diet);
        })
        .catch(error => next(error));
    }
});

module.exports = router;