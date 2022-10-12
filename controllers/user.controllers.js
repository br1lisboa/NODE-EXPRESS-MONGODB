const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const userGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    // Con el promise.all podemos hacer promesas de manera simultanea, para que puedan ejecutarse a la vez cuando no dependen
    // una de otra, reduciendo el tiempo de espera.
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(Number(limit))
            .skip(Number(from)),
    ])

    res.json({
        total,
        users
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

const userPut = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, mail, ...rest } = req.body

    //TODO validar contra base de datos

    if (password) {
        // 2- Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10) // El salt es el numero de vueltas para realizar la desencrypt.
        rest.password = bcryptjs.hashSync(password, salt) // El hash es para encryptar en una sola via
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user)
}

const userDelete = async (req, res = response) => {

    const { id } = req.params

    // Borrado FISICO - NO recomendado - Por que se pierde la integridad referencial
    // const userDelete = await User.findByIdAndDelete(id)

    // Borrado recomendado - cambiar state a false
    const userDelete = await User.findByIdAndUpdate(id, { state: false })

    res.json({
        userDelete
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