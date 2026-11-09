const router = require('express').Router()
const controller = require('../controllers/usuarios.controller')

router.get('/', controller.listar)
router.get('/:id', controller.buscarPorId)
router.post('/', controller.criar)

module.exports = router