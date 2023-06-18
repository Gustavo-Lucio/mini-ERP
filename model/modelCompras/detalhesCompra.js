const Sequelize = require('sequelize')
const database = require('../../db.js')
const produto = require('../modelEstoque/produto.js')
const detalhesVenda = require('../modelVendas/detalhesVenda.js')

const detalhesCompra = database.define('detalhesCompra', {
    serial: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    nota_fiscal: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    qtd_compra: {
        type: Sequelize.INTEGER,
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
detalhesVenda.belongsTo(produto, { as: 'produto', allowNull: false })

module.exports = detalhesCompra