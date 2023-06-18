const Sequelize = require('sequelize')
const database = require('../../db.js')
const produto = require('../modelEstoque/produto.js')

const detalhesVenda = database.define('detalhesVenda', {
    serial: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    nota_fiscal: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    qtd_venda: {
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

module.exports = detalhesVenda