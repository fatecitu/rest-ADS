const router = require('express').Router()
const controller = require('../controllers/usuarios.controller')
const {validarCriacaoUsuario, validarIdUsuario} = require('../validators/usuarios.validator')
const validarResultado = require('../middleware/validarResultado')

router.get('/', controller.listar)
router.get('/:id', validarIdUsuario, validarResultado, controller.buscarPorId)
router.post('/', validarCriacaoUsuario, validarResultado, controller.criar)

module.exports = router