// backend/src/modules/Categorias/models/Categoria.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../utils/database");

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
      },
    },
  },
  {
    tableName: "categorias",
    timestamps: true,
  }
);

module.exports = Categoria;
