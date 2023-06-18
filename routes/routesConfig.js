const app = express()

const auth = require('../auth.js')
const Login = require('../controllers/controllerUsuarios/login.js')
const Usuario = require('../controllers/controllerUsuarios/usuario.js')
const Produto = require('../controllers/controllerEstoque/produto.js')
const Deposito = require('../controllers/controllerEstoque/deposito.js')
const MovimentoProduto = require('../controllers/controllerEstoque/movimentoProduto.js')

const detalhesVenda = require('../controllers/controllerVendas/detalhesVenda.js')
const Venda = require('../controllers/controllerVendas/Venda.js')
const TitulosVenda = require('../controllers/controllerVendas/titulosVenda.js')
const MovimentoVenda = require('../controllers/controllerVendas/movimentoVenda.js')

const detalhesCompra = require('../controllers/controllerCompras/detalhesCompra.js')
const Compra = require('../controllers/controllerCompras/Compra.js')
const TitulosCompra = require('../controllers/controllerCompras/titulosCompra.js')
const MovimentoCompra = require('../controllers/controllerCompras/movimentoCompra.js')

//Cria a rota principal http://localhost:porta/
app.get('/inicio', (req, res) => {
    res.send('Aplicativo online - Opa! To na Area!')
})

// //ler a hora do servidor
app.get('/hora', (req, res) => {
    const t = Date.now()
    const data = moment().format('HH:mm:ss')
    console.log(data)
    res.send(data)
})

//REALIZA LOGIN
app.post('/login', Login.realizaLogin);
app.post('/user/save', auth.verificaToken, Login.validaAuth);

//CRUD USUARIOS
app.post('/usuario', auth.verificaToken, Usuario.cadastro);
app.get('/usuario', Usuario.consulta);
app.get(`/usuario/:id`, Usuario.consultaId);
app.put('/usuario/:id', Usuario.alteraId);
app.delete(`/usuario/:id`, Usuario.deletaId);

// CRUD PRODUTOS
app.post('/produto', Produto.cadastro);
app.get('/produto', Produto.consulta);
app.get('/produto/:id', Produto.consultaId);
app.put('/produto/:id', Produto.alteraId);
app.delete('/produto/:id', Produto.deletaId);

//CRUD DEPOSITOS
app.post('/deposito', Deposito.cadastro);
app.get('/deposito', Deposito.consulta);
app.get(`/deposito/:id`, Deposito.consultaId);
app.put('/deposito/:id', Deposito.alteraId);
app.delete(`/deposito/:id`, Deposito.deletaId)

//MOVIMENTOS DE ESTOQUE
app.post('/movimentoProduto', MovimentoProduto.realizaMov);
app.get(`/movimentoProduto/produto/:produtoId`, MovimentoProduto.consultaQntdTotal);
app.get(`/movimentoProduto/estoque/:produtoId`, MovimentoProduto.consultaQntdEstoque);

//SISTEMA DE COMPRA
//DETALHES DE COMPRA
app.post('/detalhesCompra', detalhesCompra.cadastro);
app.get(`/detalhesCompra/`, detalhesCompra.consulta);
app.get(`/detalhesCompra/:nota_fiscal`, detalhesCompra.consultaNota);

//COMPRA
app.post('/compra', Compra.confirmaCompra);
app.get(`/compra/`, Compra.consulta);
app.get(`/compra/:nota_fiscal`, Compra.consultaNota);

//TITULOS DE COMPRA
app.post('/tituloCompra', TitulosCompra.tituloCompra);
app.get(`/tituloCompra`, TitulosCompra.consulta);
app.get(`/tituloCompra/:numTitulo`, TitulosCompra.consultaTitulo);

//MOVIMENTO DE COMPRA
app.post('/movimentoCompra', MovimentoCompra.criaMovimentoCompra);
app.get(`/movimentoCompra`, MovimentoCompra.consultaMovimentoCompra);
app.get(`/movimentoCompra/:serial`, MovimentoCompra.consultaMovimentoCompraSerial);

//SISTEMA DE VENDA
//DETALHES DE VENDA
app.post('/detalhesVenda', detalhesVenda.cadastro);
app.get(`/detalhesVenda/`, detalhesVenda.consulta);
app.get(`/detalhesVenda/:nota_fiscal`, detalhesVenda.consultaNota);

//VENDA
app.post('/Venda', Venda.confirmaVenda);
app.get(`/Venda/`, Venda.consulta);
app.get(`/Venda/:nota_fiscal`, Venda.consultaNota);

//TITULOS DE VENDA
app.post('/tituloVenda', TitulosVenda.tituloVenda);
app.get(`/tituloVenda`, TitulosVenda.consulta);
app.get(`/tituloVenda/:numTitulo`, TitulosVenda.consultaTitulo);

//MOVIMENTO DE VENDA
app.post('/movimentoVenda', MovimentoVenda.criaMovimentoVenda);
app.get(`/movimentoVenda`, MovimentoVenda.consultaMovimentoVenda);
app.get(`/movimentoVenda/:serial`, MovimentoVenda.consultaMovimentoVendaSerial);