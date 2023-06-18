const Sequelize = require('sequelize')
const database = require('../../db.js')
const compra = require('./compra.js');

const titulo_receber = database.define('titulo_recebe', {
  numTitulo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dt_venc: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  valor_original: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  situacao: {
    type: Sequelize.ENUM('abertura', 'liquidacao', 'estorno', 'cancelamento'),
    allowNull: false,
  },

  valor_aberto: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
})


titulo_receber.belongsTo(compra, { as: 'nota_fiscal', allowNull: false })

module.exports = titulo_receber
