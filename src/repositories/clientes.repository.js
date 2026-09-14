const {pool} = require('../config/database')
const consultaCliente = 'select * from clientes'
function montarCliente(linha){
    return {
        id: linha.id,
        tipo: linha.tipo,
        nome: linha.nome,
        email: linha.email,
        telefone: linha.telefone,
        cpf: linha.cpf,
        cpnj: linha.cnpj,
        dataNascimento: linha.dataNascimento
    }
}
async function listar(){
    const [linhas] = await pool.query(consultaCliente)
    return linhas.map(montarCliente)
}
async function buscarPorId(id){
    const [linhas] = await pool.query(`${consultaCliente} WHERE id = ?`,[id]) //substituimos o ? pelo id recebido
    if(linhas.length ===0){ return null}
    return montarCliente(linhas[0]) //retornamos o primeiro resultado
}
module.exports = {listar, buscarPorId}