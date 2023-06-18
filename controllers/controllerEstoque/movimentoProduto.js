const Movimento = require('../../model/modelEstoque/movimentoProduto.js')
const sequelize = require('sequelize')
const moment = require('moment')

// Movimento Realizado
const realizaMov = async (req, res) => {
  const {
    tipo,
    quantidade,
    preco_unitario,
    documento,
    produtoId,
    depositoId,
  } = req.body

  const data = moment().format('YYYY-MM-DD HH:mm:ss')
  try {
    const novoMovimento = await Movimento.create({
      data,
      tipo,
      quantidade,
      preco_unitario,
      documento,
      produtoId,
      depositoId,
    })
    res.status(201).json(novoMovimento)
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao executar movimento!')
  }
}

// Consulta Quantidade total em estoque
const consultaQntdTotal = async (req, res) => {
  const { produtoId } = req.params

  try {
    const contagemProduto = await Movimento.findAll({
      where: { produtoId },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              'CASE WHEN tipo= "Entrada" THEN quantidade ELSE -quantidade END',
            ),
          ),
          'Quantidade',
        ],
      ],
    })

    if (!contagemProduto) {
      res.status(404).json({ mensagem: 'Produto não encontrado no estoque.' })
    } else {
      const quantidadeEstoque = contagemProduto[0].dataValues.Quantidade;
      res
        .status(201)
        .json(
          `Quantidade do produto ${produtoId} em estoque é de : ${quantidadeEstoque}.`,
        )
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produto no estoque.' })
  }
}

// Consulta Quantidade total por estoque
const consultaQntdEstoque = async (req, res) => {
  const { produtoId } = req.params

  try {
    const sumProdEstoq = await Movimento.findAll({
      attributes: [
        [sequelize.literal('depositoId'), 'Deposito'],
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              'CASE WHEN tipo= "Entrada" THEN quantidade ELSE -quantidade END',
            ),
          ),
          'Quantidade',
        ],
      ],
      where: { produtoId: produtoId },
      group: ['Deposito'],
    })
    res.status(201).json(sumProdEstoq)
  } catch (error) {
    res.status(500).json({
      mensagem: `Erro ao buscar o produto ${produtoId} entre os estoque.`,
    })
  }
}

module.exports = {
  realizaMov,
  consultaQntdTotal,
  consultaQntdEstoque,
}
