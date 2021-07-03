require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { PORT } = process.env || 3001;

conn.sync({ alter: true }).then(() => {
  console.log(`Base de datos conectada con exito!`);
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`); 
  });
});