const clientesRepository = require('../repositories/clientes.repository')
async function listar(req, res, next) {
    try{
        const clientes = await clientesRepository.listar()
        return res.json({
            total: clientes.length,
            dados: clientes
        })
    } catch (erro){
        return next(erro)
    }
}

async function buscarPorId(req, res, next){
    try{
        const id =Number(req.params.id) //pegamos o valor do id enviado
        const cliente = await clientesRepository.buscarPorId(id)
        if(!cliente){
            return res.status(404).json({
                erro: 'Cliente não encontrado'
            })
        }
        return res.json(cliente)
    } catch (erro){
        return next(erro)
    }
}

async function criar(req, res, next){
    try{
        const cliente = await clientesRepository.criar(req.body)
        return res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso',
            dados: cliente
        })

    } catch (erro){
      return next(erro) //encaminha o erro para 'frente', para o próximo
    }
}

module.exports = {listar, buscarPorId, criar}