const { Router } = require('express')
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controllers')
const { check } = require('express-validator')
const { validateInp } = require('../middlewares/validate-inp')

const router = Router()

router.get('/', userGet)

// El segundo parametro es un middleware, y usando express-validator le mandamos el check, espicificando que campo del body queremos validar.
router.post('/', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras.').isLength({ min: 6 }),
    check('mail', 'El correo no es valido.').isEmail(),
    check('role', 'No es un rol permitido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // ValidationResult trabaja con el middleware de routes, que "guarda" los errores del check, entonces podemos validar.
    validateInp
], userPost)

router.put('/:id', userPut)

router.delete('/', userDelete)

router.patch('/', userPatch)


module.exports = router