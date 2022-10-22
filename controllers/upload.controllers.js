const path = require('path')
const fs = require('fs')
// Importamos CLAUDINARY y configuramos nuestra cuenta
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL) //>> Aca ya autenticamos nuestro backend con caludinary

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

    // Limpiar imagenes previas
    if (models.img) {
        //Hay que borrar la img del servidor
        const pathImg = path.join(__dirname, '../uploads', schema, models.img)
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg)
        }
    }

    const name = await upFile(req.files, undefined, schema)

    models.img = name

    await models.save()

    res.json(
        models
    )

}

const updateFileClaudinary = async (req = request, res = response) => {

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

    // Limpiar imagenes previas
    if (models.img) {
        //Hay que borrar la img de claudinary
        const nameArr = models.img.split('/') //>> Separo todo el string por el / en un array
        //console.log(nameArr)
        const name = nameArr[nameArr.length - 1] //>> Obtengo la ultima posicion del array
        //console.log(name)
        const [public_id] = name.split('.') //>> Desestructuro la ultima posicion del array aplicando otro split y separando la extension para quedarme con el id
        //console.log(public_id)
        cloudinary.uploader.destroy(public_id)
    }

    const { tempFilePath } = req.files.archive //>> Extraemos el path temporal del archivo
    // SUBIR IMAGENES A CLOUDINARY
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath) //>> Extraigo el secure_url de la respuesta

    //const name = await upFile(req.files, undefined, schema)

    models.img = secure_url

    await models.save()

    res.json(
        models
    )

}

const showImg = async (req = request, res = response) => {

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

    // Limpiar imagenes previas
    if (models.img) {
        //Hay que borrar la img del servidor
        const pathImg = path.join(__dirname, '../uploads', schema, models.img)
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImg)
}

module.exports = {
    uploadFile,
    updateFile,
    showImg,
    updateFileClaudinary
}
