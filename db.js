//Configurações do banco de dados

const Sequelize = require('sequelize')
const sequelize = new Sequelize('teste', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
}) //Constroi o objeto responsavel por abstrair o banco de dados

module.exports = sequelize
