const app = require('./app')
const port = Number(process.env.PORT) || 3001
const { testarConexao } = require('./config/database')

async function iniciarServidor() {
    try {
        await testarConexao() //conecta ao mysql    
        app.listen(port, () => {
            console.log(`🚀Servidor REST rodando em ${port}`)
        })
    } catch (erro) {
        process.exitCode = 1 //encerra o processo (0 é ok)
    }
}
iniciarServidor() //carrega a função
