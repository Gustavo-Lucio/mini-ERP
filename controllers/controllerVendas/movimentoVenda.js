const TituloVenda = require('../../model/modelVendas/detalhesVenda')
const MovimentoVenda = require('../../model/modelVendas/movimentoVenda')

const criaMovimentoVenda = async (req, res) => {
    const { data, tipo, valor, trans_esc, numero_titulo } = req.body;

    try {
        const tituloVenda = await TituloVenda.findOne({
            where: { numTitulo: numero_titulo },
        });

        if (!tituloVenda) {
            return res.status(404).json({ mensagem: 'Título de venda não encontrada' });
        }

        const MovimentoReceber = await MovimentoVenda.create({ data, tipo, valor, valor_original, trans_esc, numero_titulo })
        res.status(201).json(MovimentoReceber);

        if (trans_esc == '+') {
            tituloVenda.valor_aberto = valor_original - valor;
            tituloVenda.situacao = tipo;
            await tituloVenda.save()
        }
        else if (trans_esc == '-') {
            tituloVenda.valor_aberto = valor_original + valor;
            tituloVenda.situacao = tipo;
            await tituloVenda.save()
        }else{
            console.log('Tipo de transão escritural não existente!')
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ mensagem: 'Erro ao criar movimento de venda.' })
    }
}
const consultaMovimentoVenda = async (req, res) => {
    try {
        const movimentoVenda = await MovimentoVenda.findAll()
        res.status(201).json(movimentoVenda)
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar movimentos de venda.' })
    }
}

//Consulta detalhes de venda  por serial
const consultaMovimentoVendaSerial = async (req, res) => {
    const serial = req.params.serial

    try {
        const movimentoVenda = await MovimentoVenda.findAll({ where: { serial } })
        if (!movimentoVenda) {
            res.status(404).json({ mensagem: 'Venda não encontrado.' })
        } else {
            res.status(201).json(movimentoVenda)
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar a venda.' })
    }
}

module.exports = {
    criaMovimentoVenda, consultaMovimentoVenda, consultaMovimentoVendaSerial
}