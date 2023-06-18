const DetalhesVenda = require('../../model/modelVendas/detalhesVenda')
const Venda = require('../../model/modelVendas/venda')

// app.get('/venda/:nota_fiscal', 

const confirmaCompra = async (req, res) => {
  const { notaFiscal, fornecedor, comprador } = req.params;

  try {
    const detalhesDeVenda = await DetalhesVenda.findOne({
      where: { notaFiscal },
    });

    if (!detalhesDeVenda) {
      return res.status(404).json({ mensagem: 'Detalhes de venda não encontrados' });
    }

    //valores das outras colunas de detalhesDeVenda
    const serial = detalhesDeVenda.serial;
    const nota_fiscal = detalhesDeVenda.nota_fiscal;
    const qtd_venda = detalhesDeVenda.qtd_venda;
    const total = detalhesDeVenda.total
    const desconto = detalhesDeVenda.desconto;

    const data = moment().format('YYYY-MM-DD HH:mm:ss')
    //registro na tabela "vendas" com os valores obtidos em detalhes
    const processarVenda = await Venda.create({
      data: data,
      nota_fiscal: nota_fiscal,
      vendedor: fornecedor,
      cliente: comprador,
      qtd_venda: qtd_venda,
      total: total,
      desconto: desconto,
      detalhesVenda: serial
    });

    res.status(200).json(processarVenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a venda' });
  }
}

//Consulta processos de venda
const consulta = async (req, res) => {
  try {
    const compra = await Venda.findAll()
    res.status(201).json(compra)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar vendas processadas.' })
  }
}

//Consulta detalhes de venda  por nota fiscal
const consultaNota = async (req, res) => {
  const nota_fiscal = req.params.nota_fiscal

  try {
    const compra = await Venda.findOne({ where: { nota_fiscal } })
    if (!compra) {
      res.status(404).json({ mensagem: 'Venda não encontrado.' })
    } else {
      res.status(201).json(compra)
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar a venda.' })
  }
}


module.exports = {
  confirmaCompra, consulta, consultaNota
};