// Para crear las rutas
const { Router } = require('express')
const { check } = require('express-validator')

const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controllers')
const { isValidCategoryById, isValidProductById } = require('../helpers/db-validators')
const { validateInp, validateJWT, validateRole } = require('../middlewares')
const { Product } = require('../models')
// Instanciasmos router
const router = Router()


// << La url sera {{url}}/api/product >>
// GET >> Obtener todos los product - publico
router.get('/', getAllProducts)

// GET >> Obtener un product - id - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo valido.').isMongoId(),
    check('id').custom(isValidProductById),
], getProduct)

// POST >> Crear product - privado - cualquier persona con token puede hacerlo
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un ID de Mongo valido').isMongoId(),
    check('category').custom(isValidCategoryById),
    validateInp
], createProduct)

// PUT >> Modificar product - privado - cualquier persona con token valido.
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID de Mongo valido - update').isMongoId(),
    check('id').custom(isValidProductById),
    validateInp
], updateProduct)

// DELETE >> Pasar estado a false - privado - cualquier persona con token valido
router.delete('/:id', [
    validateJWT,
    validateRole,
    check('id', 'No es un ID de Mongo valido - update').isMongoId(),
    check('id').custom(isValidProductById),
    validateInp
], deleteProduct)

module.exports = router