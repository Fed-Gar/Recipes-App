const server = require('./src/app.js');
const { db } = require('./src/db.js');
require('dotenv').config();

const { PORT } = process.env || 3001;

db.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`); 
  });
});