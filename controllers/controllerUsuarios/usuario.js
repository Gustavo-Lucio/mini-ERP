const Usuario = require('../../model/modelUsuarios/usuario.js')


//Cadastro Usuario
const cadastro = async (req, res) => {
  const { login, senha, acesso } = req.body
  try {
    const novoUsuario = await Usuario.create({ login, senha, acesso })
    res.status(201).json(novoUsuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' })
  }
}

//Consulta usuarios
const consulta = async (req, res) => {
  try {
    const usuario = await Usuario.findAll()
    res.status(201).json(usuario)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuário.' })
  }
}

//Consulta usuario por ID
const consultaId = async (req, res) => {
  const id = req.params.id

  try {
    const usuario = await Usuario.findOne({ where: { id } })
    if (!usuario) {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' })
    } else {
      res.status(201).json(usuario)
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o usuário.' })
  }
}

//Alterar usuario por ID
const alteraId = async (req, res) => {
  const id = req.params.id
  const { login, senha, acesso } = req.body

  try {
    const usuario = await Usuario.findOne({ where: { id } })

    if (!usuario) {
      res.status(404).json({ mensagem: 'Usuário não encontrado' })
    } else {
      usuario.login = login
      usuario.senha = senha
      usuario.acesso = acesso
      await usuario.save()
      res.json({ mensagem: 'Usuário atualizado com sucesso.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário' })
  }
}

//Deletar usuario por ID
const deletaId = async (req, res) => {
  const id = req.params.id

  try {
    const usuarios = await usuario.destroy({ where: { id } })
    if (!usuarios) {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' })
    } else {
      res.status(201).json({ mensagem: 'Usuário deletado com sucesso' })
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o usuário.' })
  }
}

module.exports = {
  cadastro, consulta, consultaId, deletaId, alteraId
};