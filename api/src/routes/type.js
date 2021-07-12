const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js');        
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