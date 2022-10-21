const { Router } = require('express')
const { check } = require('express-validator')

const { uploadFile } = require('../controllers/upload.controllers')
const { validateJWT } = require('../middlewares')
const { validateInp } = require('../middlewares/validate-inp')

const router = Router()

// Subir un archivo nuevo, crearlo de 0.

router.post('/', [
    validateJWT,
    validateInp
], uploadFile)


module.exports = router