const { body, param} = require('express-validator')
const tiposCliente = ['PF','PJ']

const validarCliente = [
    body('tipo')
    .exists({checkFalsy: true})
    .withMessage('O tipo do cliente é obrigatório!')
    .bail()
    .isIn(tiposCliente)
    .withMessage('O tipo de ser PF ou PJ'),

    body('nome')
    .exists({checkFalsy: true})
    .withMessage('O nome do cliente é obrigatório')
    .bail()
    .trim()
    .isLength({min:3, max:100})
    .withMessage('O nome deve ter entre 3 e 100 caracteres'),

    body('email')
    .exists({checkFalsy: true})
    .withMessage('O email é obrigatório')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Informe um e-mail válido')    
]

module.exports = {validarCliente}