const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'recipe', 
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
            isAlpha: {
                args: true,
                msg: "El nombre solo puede contener letras"
            },
            len: {
                args: [4, 255],
                msg: "El nombre tiene que ser entre 3 y 255 caracteres"
            }
          },
        },
        summary: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
          },
        },
        score: {
          type: DataTypes.DECIMAL,
        },
        health: {
          type: DataTypes.DECIMAL,
        },
        steps: {
          type: DataTypes.TEXT,
        },
    });
};