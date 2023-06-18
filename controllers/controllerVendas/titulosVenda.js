const TituloVenda = require('../../model/modelVendas/detalhesVenda')
const modelVenda = require('../../model/modelVendas/venda')

const tituloVenda = async (req, res) => {
    const { dt_venc, situacao, valor_aberto, venda } = req.body

    try {
        const Venda = await modelVenda.findOne({
            where: { nota_fiscal: venda },
        });

        if (!Venda) {
            return res.status(404).json({ mensagem: 'Venda não encontrada' });
        }

        const valor_original = Venda.total;

        if (situacao == 'abertura') {
            valor_aberto = valor_original;
        }

        const DuplicarVenda = await TitulosVenda.findOne({
            where: {
                venda: venda,
                situacao: 'abertura'
            },
        });

        if (!DuplicarVenda) {
            const tituloReceber = await TituloVenda.create({ dt_venc, situacao, valor_aberto, valor_original, venda })
            res.status(201).json(tituloReceber)
        } else {
            res.status(409).json({ mensagem: 'Título já aberto.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensagem: 'Erro ao criar titulo de venda.' })
    }
}

const consulta = async (req, res) => {
    try {
        const venda = await TituloVenda.findAll()
        res.status(201).json(venda)
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar vendas processadas.' })
    }
}

//Consulta detalhes de venda  por nota fiscal
const consultaTitulo = async (req, res) => {
    const numTitulo = req.params.numTitulo

    try {
        const tituloReceber = await TituloVenda.findAll({ where: { numTitulo } })
        if (!tituloReceber) {
            res.status(404).json({ mensagem: 'Venda não encontrado.' })
        } else {
            res.status(201).json(tituloReceber)
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar a venda.' })
    }
}

module.exports = {
    tituloVenda, consulta, consultaTitulo
};

