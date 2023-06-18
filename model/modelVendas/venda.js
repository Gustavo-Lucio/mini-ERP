const Sequelize = require('sequelize')
const database = require('../../db.js')
const detalhesVenda = require('./detalhesVenda.js')

const Venda = database.define('venda', {
    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    nota_fiscal: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    vendedor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cliente: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qtd_venda: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    desconto: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

Venda.belongsTo(detalhesVenda, { as: 'detalhesVenda', allowNull: false })
module.exports = Venda