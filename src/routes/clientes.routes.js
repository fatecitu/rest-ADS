const express = require('express')
const clientesController = require('../controllers/clientes.controller')

const router = express.Router()

router.get('/', clientesController.listar)
router.get('/:id', clientesController.buscarPorId)

module.exports = router