const Sequelize = require('sequelize')
const database = require('../../db.js')
const Venda = require('./venda.js');

const titulo_venda = database.define('titulo_venda', {
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


titulo_venda.belongsTo(Venda, { as: 'venda', allowNull: false })

module.exports = titulo_venda
