const Sequelize = require('sequelize')
const database = require('../../db.js')
const detalhesCompra = require('./detalhesCompra.js')

const Compra = database.define('compra', {
    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    nota_fiscal: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    fornecedor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    comprador: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qtd_compra: {
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

Compra.belongsTo(detalhesCompra, { as: 'detalhesCompra', allowNull: false })
module.exports = Compra