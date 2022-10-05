const { Router } = require('express')
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controllers')

const router = Router()

router.get('/', userGet)

router.post('/', userPost)

router.put('/:id', userPut)

router.delete('/', userDelete)

router.patch('/', userPatch)


module.exports = router