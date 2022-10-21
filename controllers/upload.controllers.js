
const { request, response } = require("express");
const { upFile } = require("../helpers");

const { User, Product } = require('../models')

const uploadFile = async (req = request, res = response) => {

    try {
        const name = await upFile(req.files, undefined, 'imgs')
        res.json({
            name
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }


}

const updateFile = async (req = request, res = response) => {

    // Estos nombres los estoy definiendo en el router
    const { id, schema } = req.params

    let models

    switch (schema) {
        case 'users':
            models = await User.findById(id)
            if (!models) {
                return res.status(400).json({ msg: `No existe un usuario con el ID ${id}` })
            }
            break;

        case 'products':
            models = await Product.findById(id)
            if (!models) {
                return res.status(400).json({ msg: `No existe un producto con el ID ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    const name = await upFile(req.files, undefined, schema)

    models.img = name

    await models.save()

    res.json(
        models
    )

}

module.exports = {
    uploadFile,
    updateFile
}
