// IMPORTS //

// Import de req y res para ayudar
const { response, request } = require('express')
// Import del modelo de categoria
const { Category } = require('../models')


// getCategorys - paginado - total - populate
const getCategorys = async (req = request, res = response) => {
    // Por query el usuario limita cuantas categorias quiere ver
    const { limit = 5, from = 0 } = req.query
    // Filtramos solo las categorias con state true
    const query = { state: true }

    const [total, categories] = await Promise.all([
        // el método countDocuments() cuenta la cantidad de documentos que coinciden con los criterios de selección.
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .limit(Number(limit))
            .skip(Number(from))
    ])

    res.json({
        total, categories
    })
}


// getCategory - populate{}
const getCategory = async (req = request, res = response) => {

    const { id } = req.params

    const categoryFind = await Category.findById(id).populate('user', 'name')

    res.json({
        categoryFind
    })
}


// Crear categorias
const createCategory = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase()

    const categoryBD = await Category.findOne({ name })

    if (categoryBD) {
        return res.status(400).json({
            msg: `La categoria ${categoryBD.name} ya existe.`
        })
    }

    // Una vez pasada la validacion, y corroborando que no existe otra categoria con el mismo nombre, generamos la data.
    const data = {
        name,
        user: req.userAuth._id
    }
    const category = new Category(data)

    // Grabar en BD
    await category.save()

    res.status(201).json({ category })
}


// updateCategory
const updateCategory = async (req = request, res = response) => {

    const { id } = req.params
    //console.log(`ID pasado por params ${id}`)

    const { state, user, ...rest } = await req.body

    rest.name = rest.name.toUpperCase()
    rest.user = req.userAuth._id

    const categUpdate = await Category.findByIdAndUpdate(id, rest, { new: true }) // Este 3er param nos permite una actualizacion automatica en la respuesta

    res.json(categUpdate)

}


// deleteCategory - state:false
const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params

    // NO borramos, sino cambiamos el estado, para mantener nuestra integridad de base
    const categDelete = await Category.findByIdAndUpdate(id, { state: false })

    res.status(200).json({
        categDelete
    })
}







module.exports = {
    createCategory,
    getCategorys,
    getCategory,
    updateCategory,
    deleteCategory
}