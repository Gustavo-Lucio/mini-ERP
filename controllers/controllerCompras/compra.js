const DetalhesCompra = require('../../model/modelCompras/detalhesCompra')
const Compra = require('../../model/modelCompras/compra')

// app.get('/compra/:nota_fiscal', 

const confirmaCompra = async (req, res) => {
  const { notaFiscal, fornecedor, comprador } = req.params;

  try {
    const detalhesDeCompra = await DetalhesCompra.findOne({
      where: { notaFiscal },
    });

    if (!detalhesDeCompra) {
      return res.status(404).json({ mensagem: 'Detalhes de compra não encontrados' });
    }

    //valores das outras colunas de detalhesDeCompra
    const serial = detalhesDeCompra.serial;
    const nota_fiscal = detalhesDeCompra.nota_fiscal;
    const qtd_compra = detalhesDeCompra.qtd_compra;
    const total = detalhesDeCompra.total
    const desconto = detalhesDeCompra.desconto;

    const data = moment().format('YYYY-MM-DD HH:mm:ss')
    //registro na tabela "compras" com os valores obtidos em detalhes
    const processarCompra = await Compra.create({
      data: data,
      nota_fiscal: nota_fiscal,
      fornecedor: fornecedor,
      comprador: comprador,
      qtd_compra: qtd_compra,
      total: total,
      desconto: desconto,
      detalhesCompra: serial
    });

    res.status(200).json(processarCompra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a compra' });
  }
}

//Consulta processos de compra
const consulta = async (req, res) => {
  try {
    const compra = await Compra.findAll()
    res.status(201).json(compra)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar compras processadas.' })
  }
}

//Consulta detalhes de compra  por nota fiscal
const consultaNota = async (req, res) => {
  const nota_fiscal = req.params.nota_fiscal

  try {
    const compra = await DetalhesCompra.findOne({ where: { nota_fiscal } })
    if (!produtos) {
      res.status(404).json({ mensagem: 'Compra não encontrado.' })
    } else {
      res.status(201).json(compra)
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar o produto.' })
  }
}


module.exports = {
  confirmaCompra, consulta, consultaNota
};