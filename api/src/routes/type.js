const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js'); 
const { v4: uuidv4 } = require('uuid');

const diets = ['Gluten Free', 'Ketogenic',' Vegetarian', 'Lacto-Vegetarian',
                'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'];

router.get('/', (_req, res, next) => {
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
En una primera instancia, cuando no exista ninguno, 
deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
*/
// router.get('/', (_req, res, next) => {
//     console.log('ATRO');
//     if(loaded) {
//         Type.findAll()
//         .then(diets => {
//             console.log('Traidas desde la DB...')
//             return res.status(200).json(diet);
//         })
//         .catch(error => next(error));
//     };
//     diets.forEach(diet => {
//         Type.create({
//             id: uuidv4(),
//             name: diet,   
//         })
//     })
//     .then(diets => {
//         loaded = true;
//         console.log('Dietas creadas...')
//     })
//     .catch(error => next(error));
// });

module.exports = router;
// hacer uno que las cargue
// otra que busque todas o por nombre(query)
// dos diferentes a mismas rutas