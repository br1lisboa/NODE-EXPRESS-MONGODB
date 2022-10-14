const { Router } = require('express')

const { check } = require('express-validator')
const { validateInp } = require('../middlewares/validate-inp')

const { loginController, googleSingIn } = require('../controllers/auth.controllers')

const router = Router()

router.post('/login', [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateInp
], loginController)

router.post('/google', [
    check('id_token', 'El id_token de G es obligatorio').not().isEmpty(),
    validateInp
], googleSingIn)

module.exports = router