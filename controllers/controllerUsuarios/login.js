const jwt = require('jsonwebtoken')
const auth = require('../../auth.js')
const Usuario = require('../../model/modelUsuarios/usuario.js')

const realizaLogin = async (req, res) => {
  const { login, senha } = req.body

  try {
    const usuario = await auth.autentica(login, senha)
    const token = jwt.sign({ idUsuario: usuario.id }, process.env.SECRET)
    res.json({ token })
  } catch (err) {
    res.status(401).json({ mensagem: 'Falha no login!' })
  }
}

//Rota autenticada
const validaAuth = (req, res) => {
  console.log('Autenticou')
  res.send('ok')
}

module.exports = {
  realizaLogin, validaAuth
}