const Produto = require('../../model/modelEstoque/produto')

//Cadastro produtos
const cadastro = async (req, res) => {
  const { nome, descricao } = req.body

  try {
    const novoProduto = await Produto.create({ nome, descricao })
    res.status(201).json(novoProduto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao cadastrar produto.' })
  }
}

//Consulta produtos
const consulta = async (req, res) => {
  try {
    const produtos = await Produto.findAll()
    res.status(201).json(produtos)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produto.' })
  }
}

//Consulta produto por ID
const consultaId = async (req, res) => {
  const id = req.params.id

  try {
    const produtos = await Produto.findOne({ where: { id } })
    if (!produtos) {
      res.status(404).json({ mensagem: 'Produto não encontrado.' })
    } else {
      res.status(201).json(produtos)
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o produto.' })
  }
}

//Alterar produto por ID
const alteraId = async (req, res) => {
  const id = req.params.id
  const { nome, descricao } = req.body

  try {
    const produtos = await Produto.findOne({ where: { id } })

    if (!produtos) {
      res.status(404).json({ mensagem: 'Produto não encontrado' })
    } else {
      produtos.nome = nome
      produtos.descricao = descricao
      await produtos.save()
      res.json({ mensagem: 'Produto atualizado com sucesso.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao atualizar produto' })
  }
}

//Deletar produto por ID
const deletaId = async (req, res) => {
  const id = req.params.id

  try {
    const produtos = await Produto.destroy({ where: { id } })
    if (!produtos) {
      res.status(404).json({ mensagem: 'Produto não encontrado.' })
    } else {
      res.status(201).json({ mensagem: 'Produto deletado com sucesso' })
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o produto.' })
  }
}


module.exports = {
  cadastro, consulta, consultaId, deletaId, alteraId
};