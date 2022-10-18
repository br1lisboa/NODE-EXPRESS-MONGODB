// IMPORTS //

// Router > crea manejadores de rutas montables y modulares.
const { Router } = require('express')
// check > crea puntos de validacion que son gurdados en una variable en caso de haber errores
const { check } = require('express-validator')
// custom middleware que analiza si la variable de errores de check contiene algo, si NO esta vacia, devuelve el error 400
const { validateInp } = require('../middlewares')

// Instanciamos router
const router = Router()


// {{url}}/api/category

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json({
        msg: 'get - todas las categorias'
    })
})

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get - una categoria'
    })
})

// Crear categoria - privado - cualquier persona con un token valido.
router.post('/', (req, res) => {
    res.json({
        msg: 'post - crea categ'
    })
})

// Actualizar categoria - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json({
        msg: 'put - actualizar'
    })
})

// Borrar categoria - privado - solo si es admin
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete - categoria por ID'
    })
})

module.exports = router