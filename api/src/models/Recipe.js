const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      // como la api maneja los ids como numeros para diferenciarlos de los mios uso uuid
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
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