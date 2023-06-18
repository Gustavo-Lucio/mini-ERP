const Sequelize = require('sequelize')
const database = require('../../db.js')
const titulosCompra = require('./titulosCompra.js')

const movimento_compra = database.define('movimento_compra', {
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

movimento_compra.belongsTo(titulosCompra, { as: 'numero_titulo', allowNull: false })
module.exports = movimento_receber
