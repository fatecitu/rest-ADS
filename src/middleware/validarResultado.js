const {validationResult} = require('express-validator')

function validarResultado(req, res, next) {
    const resultado = validationResult(req)
    if (resultado.isEmpty()){
        //se não tem erro nenhum, vai pro próximo
        return next()
    }
    //se tiver erro, mostra os erros
    return res.status(400).json({
        erro: 'Dados inválidos!',
        detalhes: resultado.array().map((erro) => ({
            campo: erro.path,
            mensagem: erro.msg,
            valorRecebido: erro.value
        }))
    })
}
module.exports = validarResultado