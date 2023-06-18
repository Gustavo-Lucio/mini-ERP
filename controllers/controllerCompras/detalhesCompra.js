const DetalhesCompra = require('../../model/modelCompras/detalhesCompra')

//Criar detalhes para compra
const cadastro = async (req, res) => {
  const { nota_fiscal, qtd_compra, total, desconto, produto } = req.body

  try {
    const novoDetalhesCompra = await DetalhesCompra.create({ nota_fiscal, qtd_compra, total, desconto, produto })
    res.status(201).json(novoDetalhesCompra)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao criar detalhes para compra.' })
  }
}

//Consulta detalhes de compra
const consulta = async (req, res) => {
  try {
    const consultaCompra = await DetalhesCompra.findAll()
    res.status(201).json(consultaCompra)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar detalhes de compra.' })
  }
}

//Consulta detalhes de compra  por nota fiscal
const consultaNota = async (req, res) => {
  const nota_fiscal = req.params.nota_fiscal

  try {
    const detalhesCompra = await DetalhesCompra.findOne({ where: { nota_fiscal } })
    if (!produtos) {
      res.status(404).json({ mensagem: 'Compra em estado precessamento não encontrada.' })
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