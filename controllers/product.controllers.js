const { request, response } = require('express')
const { Product } = require('../models')


// getallproducts - paginado - total - populate
const getAllProducts = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query

    const query = { state: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .limit(Number(limit))
            .skip(Number(from))
    ])

    res.status(200).json({
        total,
        products
    })
}


const getProduct = async (req, res) => {

    const { id } = req.params

    const productFind = await Product.findById(id)

    console.log(productFind)

    res.json({
        productFind
    })
}

const createProduct = async (req = request, res = response) => {

    //console.log(req.query)
    const { state, user, ...body } = req.body

    const productBD = await Product.findOne({ name: body.name })

    //TODO hacer validacion de name === name que reviente

    if (productBD) {
        return res.status(400).json({
            msg: `El producto con el nombre ${productBD.name} ya existe. `
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.userAuth._id
    }

    const product = new Product(data)

    // Grabamos en BD
    await product.save()

    res.status(201).json({ product })

}

const updateProduct = async (req = request, res = response) => {

    const { id } = req.params

    const { user, state, ...rest } = req.body

    if (rest.name) {
        rest.name = rest.name.toUpperCase()
    }

    rest.user = req.userAuth._id

    const productUpdate = await Product.findByIdAndUpdate(id, rest, { new: true })

    res.json(productUpdate)

}

const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params

    const productDelete = await Product.findByIdAndUpdate(id, { state: false })

    res.status(200).json({
        productDelete
    })

}
module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}