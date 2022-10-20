// SIempre para las rutas, importar Router
const { Router } = require('express')
const { search } = require('../controllers/search.controllers')

const router = Router()

// Es un estandar que las rutas de busquedas sean GET, y se pasen los argumentos
router.get('/:schema/:term', search)




module.exports = router