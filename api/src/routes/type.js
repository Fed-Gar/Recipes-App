const { Router } = require('express');
const router = Router();
const { Type } = require('../db.js');        
/*
 GET /types:
Obtener todos los tipos de dieta posibles
*/
router.get('/', (_req, res, next) => {
    Type.findAll()
    .then(diets => {
        res.status(200).json(diets);
    })
    .catch(error => next(error));
});

module.exports = router;