async function listar(req, res, next) {
    try{
        const clientes =[{id:1, tipo:'PF', nome:'João Silva', email:'joao@silva.com'},
            {id:2, tipo:'PJ', nome:'ACME Inc', email:'acme@inc.com'}]
        return res.json({
            total: clientes.length,
            dados: clientes
        })
    } catch (erro){
        return next(erro)
    }
}
module.exports = {listar}