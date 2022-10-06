const { Router } = require('express')
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controllers')
const { check } = require('express-validator')

const router = Router()

router.get('/', userGet)

// El segundo parametro es un middleware, y usando express-validator le mandamos el check, espicificando que campo del body queremos validar.
router.post('/', [
    check('mail', 'El correo no es valido').isEmail()
], userPost)

router.put('/:id', userPut)

router.delete('/', userDelete)

router.patch('/', userPatch)


module.exports = router