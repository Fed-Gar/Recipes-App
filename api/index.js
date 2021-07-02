const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//-----------------------------------------
const Express = require('express');
const app = Express();
const morgan = require('morgan');

const PORT = 3001;
// Aca seteo los headers
app.use(express.urlencoded({extended:true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(morgan('dev'));
// Seteo las Rutas

// Middleware de control de errores

// Server listener
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`); 
  });
});