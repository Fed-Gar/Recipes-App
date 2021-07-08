const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js'); 

const diets = ['Gluten Free', 'Ketogenic',' Vegetarian', 'Lacto-Vegetarian',
                'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];
/*
 GET /types:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, 
deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
*/
router.get('/', (req, res, next) => {
    const { diet } = req.query;
    if(diet) {
        Type.findAll({
            where: {
                name: diet,
            },
        })
        .then(diet => {
            console.log('Traida desde la DB...')
            return res.status(200).json(diet);
        })
        .catch(error => next(error));
    };
    diets.forEach(diet => {
        Type.create({
            id: uuidv4(),
            name: diet,   
        })
    })
    .then(diets => {
        console.log('Dietas creadas...')
    })
    .catch(error => next(error));
});

module.exports = router;