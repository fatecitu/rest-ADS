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
module.exports = {listar, buscarPorId}