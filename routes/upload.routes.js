const { Router } = require('express')
const { check } = require('express-validator')

const { uploadFile, updateFile } = require('../controllers/upload.controllers')
const { allowedSchemas } = require('../helpers')
const { validateJWT, validateArch } = require('../middlewares')
const { validateInp } = require('../middlewares/validate-inp')

const router = Router()

// Subir un archivo nuevo, crearlo de 0.
router.post('/', [
    validateJWT,
    validateArch,
    validateInp
], uploadFile)

// Actualizar 
router.put('/:schema/:id', [
    validateJWT,
    validateArch,
    check('id', 'El ID debe ser de Mongo').isMongoId(),
    check('schema').custom(c => allowedSchemas(c, ['users', 'products'])),
    validateInp
], updateFile)


module.exports = router