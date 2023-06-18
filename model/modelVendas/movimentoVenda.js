const Sequelize = require('sequelize')
const database = require('../../db.js')
const titulosVenda = require('./titulosVenda.js')


const movimento_venda = database.define('movimento_venda', {
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
    type: Sequelize.ENUM('abertura', 'liquidacao', 'estorno', 'cancelamento'),
    allowNull: false,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  trans_esc: {
    type: Sequelize.ENUM('+', '-'),
    allowNull: false,
  },
})

movimento_venda.belongsTo(titulosVenda, { as: 'titulosVenda', allowNull: false })
module.exports = movimento_venda
