const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const { isValidMail } = require('../helpers/db-validators')

const userGet = (req = request, res = response) => {
    const query = req.query // esto tambien se puede desestructurar
    res.json({
        ok: true,
        msg: 'get Api - controller',
        query
    })
}

const userPost = async (req = request, res = response) => {
    const { name, mail, password, role } = req.body // esto se puede desestructurar
    const user = new User({ name, mail, password, role }) // model de user con schema y model de mongosee


    // 1- Verificar si el correo existe (si existe el correo o no es valido, para que hacer la encrypt?)
    // > Lo hacemos en las rutas, gracias al express validator

    //> PASOS PARA EL ENCRYPT <//
    // 2- Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10) // El salt es el numero de vueltas para realizar la desencrypt.
    user.password = bcryptjs.hashSync(password, salt) // El hash es para encryptar en una sola via
    // 3- Guardar en BD
    await user.save() // con este metodo le decimos a mongosee que guarde los datos en la bd 
    res.json({
        ok: true,
        msg: 'post Api',
        user
    })
}

const userPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        ok: true,
        msg: 'put Api',
        id
    })
}


const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete Api'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch Api'
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}