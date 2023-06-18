const Sequelize = require('sequelize')
const database = require('../../db.js')
const Produto = require('./produto.js')
const Deposito = require('./deposito.js')

const Movimento_produto = database.define('movimento_produto', {
  serial: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.ENUM('Entrada', 'Saida'),
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  preco_unitario: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  documento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

Movimento_produto.belongsTo(Produto, { as: 'produto', allowNull: false })
Movimento_produto.belongsTo(Deposito, { as: 'deposito', allowNull: false })

module.exports = Movimento_produto;
