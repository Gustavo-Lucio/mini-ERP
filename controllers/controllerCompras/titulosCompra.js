const TituloCompra = require('../../model/modelCompras/detalhesCompra')
const modelCompra = require('../../model/modelCompras/compra')

const tituloCompra = async (req, res) => {
    const { dt_venc, situacao, valor_aberto, compra } = req.body

    try {
        const Compra = await modelCompra.findOne({
            where: { nota_fiscal: compra },
        });

        if (!Compra) {
            return res.status(404).json({ mensagem: 'Compra não encontrada' });
        }

        const valor_original = Compra.total;

        if (situacao == 'abertura') {
            valor_aberto = valor_original;
        }

        const DuplicarCompra = await TituloCompra.findOne({
            where: {
                compra: compra,
                situacao: 'abertura'
            },
        });

        if (!DuplicarCompra) {
            const tituloCompra = await TituloCompra.create({ dt_venc, situacao, valor_aberto, valor_original, compra })
            res.status(201).json(tituloCompra)
        } else {
            res.status(409).json({ mensagem: 'Título já aberto.' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensagem: 'Erro ao criar titulo de compra.' })
    }
}

const consulta = async (req, res) => {
    try {
        const compra = await tituloCompra.findAll()
        res.status(201).json(compra)
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar vendas processadas.' })
    }
}

//Consulta detalhes de venda  por nota fiscal
const consultaTitulo = async (req, res) => {
    const numTitulo = req.params.numTitulo

    try {
        const titulosCompra = await TituloCompra.findAll({ where: { numTitulo } })
        if (!titulosCompra) {
            res.status(404).json({ mensagem: 'Venda não encontrado.' })
        } else {
            res.status(201).json(titulosCompra)
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar a venda.' })
    }
}

module.exports = {
    tituloCompra, consulta, consultaTitulo
}