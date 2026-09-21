const express = require('express')
const clientesController = require('../controllers/clientes.controller')
const { validarCliente} = require('../validators/clientes.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', clientesController.listar)
router.get('/:id', clientesController.buscarPorId)
router.post('/', validarCliente, validarResultado, clientesController.criar)

module.exports = router