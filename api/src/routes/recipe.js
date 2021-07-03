const { Router } = require('express');
const router = Router();

/*
GET /recipes?name="...":
Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query paraeter
Si no existe ninguna receta mostrar un mensaje adecuado
*/

/*
GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
*/

/*
POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos
*/