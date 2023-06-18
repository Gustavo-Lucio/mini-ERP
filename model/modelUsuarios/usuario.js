//Classe model para clientes

const Sequelize = require('sequelize')
const database = require('../../db.js')

const Usuario = database.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  acesso: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = Usuario
