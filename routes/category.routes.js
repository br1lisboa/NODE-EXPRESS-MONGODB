// IMPORTS //

// Router > crea manejadores de rutas montables y modulares.
const { Router } = require('express')
// check > crea puntos de validacion que son gurdados en una variable en caso de haber errores
const { check } = require('express-validator')
const { createCategory, getCategorys, getCategory, updateCategory, deleteCategory } = require('../controllers/category.controllers')
const { isValidCategoryById, isAdminUserByRole } = require('../helpers/db-validators')
// custom middleware que analiza si la variable de errores de check contiene algo, si NO esta vacia, devuelve el error 400
const { validateInp, validateJWT } = require('../middlewares')

// Instanciamos router
const router = Router()


// {{url}}/api/category

// Obtener todas las categorias - publico
router.get('/', getCategorys)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo valido.').isMongoId(),
    check('id').custom(isValidCategoryById),
    validateInp,
], getCategory)

// Crear categoria - privado - cualquier persona con un token valido (osea que tengo que llamar a mi middleware de validar por JWT).
router.post('/', [
    validateJWT,
    // NAME hace referencia al campo obligatorio definido en el schema de category.
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateInp
], createCategory)

// Actualizar categoria - privado - cualquiera con token valido
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom(isValidCategoryById),
    validateInp
], updateCategory)

// Borrar categoria - privado - solo si es admin
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom(isValidCategoryById),
    check('role').custom(isAdminUserByRole),
    validateInp
], deleteCategory)

module.exports = router