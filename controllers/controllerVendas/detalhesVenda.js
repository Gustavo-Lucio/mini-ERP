const DetalhesVenda = require('../../model/modelVendas/detalhesVenda')

//Criar detalhes para compra
const cadastro = async (req, res) => {
  const { nota_fiscal, produto, qtd_venda, preco, desconto, produtoId } = req.body

  try {
    const novoDetalhesCompra = await DetalhesVenda.create({ nota_fiscal, produto, qtd_venda, preco, desconto, produtoId })
    res.status(201).json(novoDetalhesCompra)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao criar detalhes para compra.' })
  }
}

//Consulta detalhes de compra
const consulta = async (req, res) => {
  try {
    const consultaCompra = await DetalhesVenda.findAll()
    res.status(201).json(consultaCompra)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar detalhes de compra.' })
  }
}

//Consulta detalhes de compra  por nota fiscal
const consultaNota = async (req, res) => {
  const nota = req.params.nota_fiscal

  try {
    const detalhesCompra = await DetalhesVenda.findOne({ where: { nota } })
    if (!produtos) {
      res.status(404).json({ mensagem: 'Produto não encontrado.' })
    } else {
      res.status(201).json(detalhesCompra)
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o produto.' })
  }
}


module.exports = {
  cadastro, consulta, consultaNota
};