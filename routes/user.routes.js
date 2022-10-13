const { Router } = require('express')
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controllers')
const { check } = require('express-validator')
const { validateInp } = require('../middlewares/validate-inp')
const { isValidRole, isValidMail, isValidUserById } = require('../helpers/db-validators')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

//GET
router.get('/', userGet)

//POST
// El segundo parametro es un middleware, y usando express-validator le mandamos el check, espicificando que campo del body queremos validar.
router.post('/', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras.').isLength({ min: 6 }),
    check('mail', 'El correo no es valido.').isEmail(),
    check('mail').custom(isValidMail),
    // check('role', 'No es un rol permitido.').isIn(['ADMIN_ROLE', 'USER_ROLE']), >> vamos a checkearlo desde la bd
    check('role').custom(isValidRole),
    // ValidationResult trabaja con el middleware de routes, que "guarda" los errores del check, entonces podemos validar.
    validateInp
], userPost)

//PUT
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(isValidUserById),
    check('role').custom(isValidRole),
    validateInp
], userPut)

//DELETE
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(isValidUserById),
    validateInp
], userDelete)

router.patch('/', userPatch)


module.exports = router