const jwt = require('jsonwebtoken');
const Usuario = require('./model/modelUsuarios/usuario.js');
const bcrypt = require('bcryptjs');
require('dotenv');


const autentica = async (login, senha) => {
  const user = await Usuario.findOne({ where: { login } });
  if (!user) {
    throw new Error('Login inválido');
  }

  const isPasswordValid = await Usuario.findOne({ where: { senha } });
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  return user;
};


async function verificaToken(req, res, next) {
  const token = req.headers['x-acess-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'Token não informado' });
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      return res.status(401).json({ auth: false, message: 'A autenticação do token falhou' });
    }
    next();
  });
}


module.exports = {
  autentica, verificaToken
}