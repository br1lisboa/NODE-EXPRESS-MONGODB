const { response, request } = require("express");
const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");

// > Mongo nos cubre con algunas validaciones
const { ObjectId } = require('mongoose').Types

const allowedSchemas = [
    'categories',
    'products',
    'roles',
    'users'
]

const userSearch = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term) // Retrona TRUE o FALSE dependiendo si es o no un ID de MongoDB
    //console.log(isMongoID)
    //console.log(term)

    if (isMongoID) {

        const userFind = await User.findById(term)
        //console.log(userFind)
        return res.status(200).json({
            results: (userFind) ? [userFind] : []
        })
    }

    // Con esta expresion irregular hacemos insensible a las keysSensitive al term
    const regex = new RegExp(term, 'i')

    const users = await User.find({
        // Esto es propio de mongo, presionar $ y se habilitan las opciones or, and, etc..
        // Aca le digo que haga match con name O mail
        $or: [{ name: regex }, { mail: regex }],
        $and: [{ state: true }]
    })

    res.json({
        results: users
    })
}

const productSearch = async (term = '', res = response) => {
    //console.log(term)

    const regex = RegExp(term, 'i')

    const productFind = await Product.findOne({ name: regex })

    console.log(productFind)

    if (!productFind) {
        return res.status(400).json({
            msg: `El producto ${productFind} no se encuentra en la base de datos`
        })
    }

    res.status(200).json({
        results: productFind
    })
}

const categorySearch = async (term = '', res = response) => {
    //console.log(term)

    const regex = RegExp(term, 'i')

    const categoryFind = await Category.findOne({ name: regex })

    console.log(categoryFind)

    if (!categoryFind) {
        return res.status(400).json({
            msg: `La categoria ${categoryFind} no se encuentra en la base de datos`
        })
    }

    res.status(200).json({
        results: categoryFind
    })
}



const search = (req = request, res = response) => {

    const { schema, term } = req.params
    //console.log(schema, term)

    if (!allowedSchemas.includes(schema)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedSchemas}`
        })
    }

    switch (schema) {
        case 'categories':
            categorySearch(term, res)
            break;

        case 'products':
            productSearch(term, res)
            break;

        case 'users':
            userSearch(term, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }

}


module.exports = {
    search
}