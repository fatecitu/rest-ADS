const { body, param} = require('express-validator')
const { pool } = require('../config/database')
const tiposCliente = ['PF','PJ']

async function validarEmailUnico(email, { req }) {
    const idCliente = req.params.id
    const [clientes] = await pool.execute(
        'SELECT id FROM clientes WHERE email = ? AND (? IS NULL OR id <> ?)',
        [email, idCliente ?? null, idCliente ?? null]
    )

    if (clientes.length > 0) {
        throw new Error('Este e-mail já está cadastrado')
    }
}

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
    .bail()
    .custom(validarEmailUnico),
    
    body('telefone')
    .exists({checkFalsy: true})
    .withMessage('O telefone é obrigatório')
    .bail()
    .isLength({min:10, max:11})
    .withMessage('O telefone deve ter DDD e 10 ou 11 dígitos'),

    body('ativo')
    .optional()
    .isBoolean() //é booleano?
    .withMessage('O campo ativo deve ser verdadeiro ou falso')
    .toBoolean(), //converte para booleano

    body('data_nascimento')
    .if(body('tipo').equals('PF')) //só valida se for PF
    .exists({checkFalsy:true})
    .withMessage('A data de nascimento é obrigatório para cliente Pessoa Física')
    .bail()
    .isISO8601({strict: true, strictSeparator:true}) //é uma data?
    .withMessage('Use uma data válida no formato AAAA-MM-DD'),

    body('limite_credito')
    .optional()
    .isFloat({min:0, max: 999999.99})
    .withMessage(`O limite de crédito deve ser um valor positivo e menor 
        que 1 milhão`)
    .toFloat()
]

module.exports = {validarCliente}
