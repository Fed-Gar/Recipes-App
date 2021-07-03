const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`); 
  });
});