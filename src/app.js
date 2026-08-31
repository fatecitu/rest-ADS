require('dotenv').config() //carrega as definições do .env
const express = require('express')
const path = require('path')
const clientesRoutes = require('./routes/clientes.routes')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api', (req, res)=> {
    res.json({
        mensagem: 'API REST Fatec',
        versao: '1.0.0'
    })
})
app.use('/api/clientes', clientesRoutes)

app.use((req, res)=> {
    res.status(404).json({
        erro: 'Rota não encontrada'
    })
})
module.exports = app