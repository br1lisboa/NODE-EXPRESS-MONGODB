const { Router } = require('express')

const { check } = require('express-validator')
const { validateInp } = require('../middlewares/validate-inp')

const { loginController } = require('../controllers/auth.controllers')

const router = Router()



router.post('/login', [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateInp
], loginController)

module.exports = router