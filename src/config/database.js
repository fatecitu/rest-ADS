const mysql = require('mysql2/promise')
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_rest',
    dateStrings: true, //retorna sempre data em formato texto
    waitForConnections: true, //espera por conexões livres
    connectionLimit: 10, //limita as conexões
    queueLimit: 0 //limite máximo de requisições. 0 é sem limite
})
async function testarConexao(){
    let conexao
    try{
     conexao = await pool.getConnection()
     await conexao.query('select 1')
     console.log('Conexão com o Mysql ok!')
    } catch (erro){
     console.error('Erro no mysql', erro.message)
    } finally {
      conexao?.release()
    }
    }
module.exports = {pool, testarConexao}    