const { Router } = require('express');
const router = Router();

// Importar todos los routers;
const recipe = require('./recipe');
const type = require('./type');

// Configurar los routers
router.use('/recipes', recipe);
router.use('/types', type);

module.exports = router;