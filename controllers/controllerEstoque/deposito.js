const Deposito = require('../../model/modelEstoque/deposito.js')

//Cadastro deposito
const cadastro = async (req, res) => {
  const { nome, filial } = req.body

  try {
    const novoDeposito = await Deposito.create({ nome, filial })
    res.status(201).json(novoDeposito)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao inserir o deposito' })
  }
}

//Consulta deposito
const consulta = async (req, res) => {
  try {
    const depositos = await Deposito.findAll()
    res.status(201).json(depositos)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar deposito.' })
  }
}

//Consulta deposito por ID
const consultaId = async (req, res) => {
  const id = req.params.id

  try {
    const depositos = await Deposito.findOne({ where: { id } })
    if (!depositos) {
      res.status(404).json({ mensagem: 'Deposito não encontrado.' })
    } else {
      res.status(201).json(depositos)
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o deposito.' })
  }
}

//Alterar deposito por ID
const alteraId = async (req, res) => {
  const id = req.params.id
  const { nome, filial } = req.body

  try {
    const deposito = await Deposito.findOne({ where: { id } })

    if (!deposito) {
      res.status(404).json({ mensagem: 'Deposito não encontrado' })
    } else {
      deposito.nome = nome
      deposito.filial = filial
      await deposito.save()
      res.json({ mensagem: 'Deposito atualizado com sucesso.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao atualizar deposito' })
  }
}

//Deletar deposito por ID
const deletaId = async (req, res) => {
  const id = req.params.id

  try {
    const deposito = await Deposito.destroy({ where: { id } })
    if (!deposito) {
      res.status(404).json({ mensagem: 'Deposito não encontrado.' })
    } else {
      res.status(201).json({ mensagem: 'Deposito deletado com sucesso' })
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o deposito.' })
  }
}

module.exports = {
  cadastro, consultaId, consulta, alteraId, deletaId
}