const TituloCompra = require('../../model/modelCompras/detalhesCompra');
const MovimentoCompra = require('../../model/modelCompras/movimentoCompra')

const criaMovimentoCompra = async (req, res) => {
    const { data, tipo, valor, trans_esc, numero_titulo } = req.body;

    try {
        const tituloCompra = await TituloCompra.findOne({
            where: { numTitulo: numero_titulo },
        });

        if (!tituloCompra) {
            return res.status(404).json({ mensagem: 'Título de compra não encontrada' });
        }

        const MovimentoDeCompra = await MovimentoCompra.create({ data, tipo, valor, valor_original, trans_esc, numero_titulo })
        res.status(201).json(MovimentoDeCompra);

        if (trans_esc == '+') {
            tituloCompra.valor_aberto = valor_original - valor;
            tituloCompra.situacao = tipo;
            await tituloCompra.save()
        }
        else if (trans_esc == '-') {
            tituloCompra.valor_aberto = valor_original + valor;
            tituloCompra.situacao = tipo;
            await tituloCompra.save()
        }else{
            console.log('Tipo de transão escritural não existente!')
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensagem: 'Erro ao criar movimento de compra.' })
    }
}

const consultaMovimentoCompra = async (req, res) => {
    try {
        const movimentoCompra = await MovimentoCompra.findAll()
        res.status(201).json(movimentoCompra)
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar vendas processadas.' })
    }
}

//Consulta detalhes de venda  por serial
const consultaMovimentoCompraSerial = async (req, res) => {
    const serial = req.params.serial

    try {
        const movimentoCompra = await MovimentoCompra.findAll({ where: { serial } })
        if (!movimentoCompra) {
            res.status(404).json({ mensagem: 'Venda não encontrado.' })
        } else {
            res.status(201).json(movimentoCompra)
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar a venda.' })
    }
}

module.exports = {
    criaMovimentoCompra, consultaMovimentoCompra, consultaMovimentoCompraSerial
}