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
async function criar(dadosCliente) {
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
async function atualizar(id, dadosCliente) {
    const conexao = await pool.getConnection()
    const pessoaFisica = dadosCliente.tipo === 'PF'
    const pessoaJuridica = dadosCliente.tipo === 'PJ'
    try {
        await conexao.beginTransaction() //inicia a transação
        const [resultadoCliente] = await conexao.execute(`UPDATE clientes 
SET tipo=?, nome=?, email=?, telefone=?, cpf=?, cnpj=?, data_nascimento=?, 
    razao_social=?, nome_fantasia=?, inscricao_estadual=?, estado_civil=?, 
    ativo=?, limite_credito=?, observacoes=? WHERE id=?`, [dadosCliente.tipo,
        dadosCliente.nome, dadosCliente.email, dadosCliente.telefone,
        pessoaFisica ? dadosCliente.cpf : null,
        pessoaJuridica ? dadosCliente.cnpj : null,
        pessoaFisica ? dadosCliente.data_nascimento : null,
        pessoaJuridica ? dadosCliente.razao_social : null,
        pessoaJuridica ? dadosCliente.nome_fantasia : null,
        pessoaJuridica ? dadosCliente.inscricao_estadual : null,
        pessoaFisica ? dadosCliente.estado_civil : null,
        dadosCliente.ativo ?? true, dadosCliente.limite_credito ?? 0,
        dadosCliente.observacoes || null, id])

        if (resultadoCliente.affectedRows === 0) {//nenhuma linha foi 'afetada'
            await conexao.rollback() //daremos rollback, pois ocorreu algo!
            return null
        }
        await conexao.commit() //senão, damos commit e devolvemos o item
        return buscarPorId(id)
    } catch (erro) {
        await conexao.rollback() //por garantia, damos rollback
        throw erro;
    } finally { conexao.release() }
}
async function remover(id){
    const [resultado] = await pool.execute('DELETE FROM clientes where id=?',
          [id])
    return resultado.affectedRows > 0
}
module.exports = { listar, buscarPorId, criar, atualizar, remover }
