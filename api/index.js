require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { origin } = require('./src/foundation/origin');
const { PORT } = process.env || 3001;

conn.sync({ alter: true }).then(() => {
  console.log(`Base de datos conectada con exito!`);
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`); 
    return origin;
  });
});

// comandos:
// \l ==> muestra todas las bases de datos
// \c nombre ==> conecta a una base especifica
// \dt ==> te trae la info de las tablas de esa base
// \d+ nombre ==> info tabla especifica
// \dn ==> todas los esquemas
// \dv ==> todas los vistas
// \q ==> cerrar
// SELECT * FROM name