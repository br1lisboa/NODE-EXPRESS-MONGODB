const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generator-jwt')

const loginController = async (req, res = response) => {

    const { mail, password } = req.body

    try {
        // Verificar si el mail existe
        const users = await User.findOne({ mail })
        if (!users) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar si el usuario esta activo
        if (!users.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario'
            })
        }

        // Verificar password
        const validPass = bcryptjs.compareSync(password, users.password)
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT jason web token
        const token = await generateJWT(users.id)

        res.json({
            users,
            token
        })
        
    } catch (error) {
        console.log(error)
        // Status 500 == internal server error
        res.status(500).json({
            msg: 'Ups! Algo salio mal. Hable con el administrador'
        })
    }

}

module.exports = {
    loginController
}