//Projeto Sistemas Corporativos

const moment = require('moment')
const express = require('express')
const app = express()
const RoutesConfig = require('./routes/routesConfig.js')


require('dotenv')
require('dotenv').config() //Instanciano do .env

app.use(express.json())
//19/04/2023
//Criar uma IIF (Imediately Invoked Function)
;(async () => {
  const database = require('./db.js')
  await database.sync({ alter: true })
})()

app.use('/', RoutesConfig)

//No final do index.js, ativar o servidor
const PORT = 3000
app.listen(PORT, () => {
  console.log(process.env.SECRET)
  console.log(`Servidor rodando na porta ${PORT}`)
})