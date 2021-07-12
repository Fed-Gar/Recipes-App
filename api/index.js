require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const chargeRecipes = require('./src/charge/recipes');
const chargeTypes = require('./src/charge/types');

const { PORT } = process.env || 3001;

conn.sync({ force: true }).then(() => {
  chargeRecipes();
  chargeTypes();
  console.log(`Base de datos conectada con exito!`);
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`); 
  });
});