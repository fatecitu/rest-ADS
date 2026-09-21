const { pool } = require('../config/database')
const consultaCliente = 'select * from clientes'
function montarCliente(linha) {
    return {
        id: linha.id,
        tipo: linha.tipo,
        nome: linha.nome,
        email: linha.email,
        telefone: linha.telefone,
        cpf: linha.cpf,
        cnpj: linha.cnpj,
        data_nascimento: linha.data_nascimento,
        razao_social: linha.razao_social,
        nome_fantasia: linha.nome_fantasia,
        inscricao_estadual: linha.inscricao_estadual,
        estado_civil: linha.estado_civil,
        ativo: linha.ativo,
        limite_credito: linha.limite_credito,
        observacoes: linha.observacoes,
        criado_em: linha.criado_em,
        atualizado_em: linha.atualizado_em
    }
}
async function listar() {
    const [linhas] = await pool.query(consultaCliente)
    return linhas.map(montarCliente)
}
async function buscarPorId(id) {
    const [linhas] = await pool.query(`${consultaCliente} WHERE id = ?`, [id]) //substituimos o ? pelo id recebido
    if (linhas.length === 0) { return null }
    return montarCliente(linhas[0]) //retornamos o primeiro resultado
}
async function criar(dadosCliente){
    const cliente = {
        tipo: dadosCliente.tipo,
        nome: dadosCliente.nome,
        email: dadosCliente.email,
        telefone: dadosCliente.telefone,
        cpf: dadosCliente.tipo === 'PF' ? dadosCliente.cpf : null,
        cnpj: dadosCliente.tipo === 'PJ' ? dadosCliente.cnpj : null,
        data_nascimento: dadosCliente.tipo === 'PF' ? dadosCliente.data_nascimento : null,
        razao_social: dadosCliente.tipo === 'PJ' ? dadosCliente.razao_social : null,
        nome_fantasia: dadosCliente.tipo === 'PJ' ? dadosCliente.nome_fantasia : null,
        inscricao_estadual: dadosCliente.tipo === 'PJ' ? dadosCliente.inscricao_estadual : null,
        estado_civil: dadosCliente.tipo === 'PF' ? dadosCliente.estado_civil : null,
        ativo: dadosCliente.ativo ?? true,
        limite_credito: dadosCliente.limite_credito ?? 0,
        observacoes: dadosCliente.observacoes ?? null
    }
    const sql = 'insert into clientes SET ?'
    //o resultado devolve o id inserido em um método chamado insertId
    const [resultado] = await pool.query(sql, [cliente])
    return buscarPorId(resultado.insertId)
}

module.exports = { listar, buscarPorId, criar }
