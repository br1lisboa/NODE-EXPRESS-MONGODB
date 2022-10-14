const { response, json } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generator-jwt')
const { googleVerify } = require('../helpers/google-verify')

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

const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body
    console.log(id_token)


    try {
        const { name, img, mail } = await googleVerify(id_token)
        console.log(name, img, mail)

        // Referencia para verificar si el correo ya existe en la base de datos
        let users = await User.findOne({ mail })
        console.log(users)

        if (!users) {
            // Tengo que crearlo si no existe
            console.log('creando user')
            const data = {
                name,
                mail,
                password: ':P',
                img,
                google: true
            }
            console.log(data)
            user = new User(data)
            console.log(user)
            await users.save()
        }

        // Si el usuario en BD
        if(!user.state){
            return res.status(401).json({
                msg:'Hable con el ADMIN - user bloqueado'
            })
        }

        // Generar el JWT jason web token
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token de Google no se pudo verificar - ringonfire'
        })
    }

    /* try {

        const googleUser = await googleVerify(id_token)
        console.log(googleUser)

        const { name, img, mail } = googleUser
        console.log(mail)

        // Crear referencia para verificar si el correo existe en nuestra BD
        let user = await User.findOne({ mail })
        //console.log(user)

        // err aca
        if (!user) {
            // Tengo que crearlo
            const data = {
                name,
                mail,
                password: 'xD',
                img,
                google: true
            }
            user = new User(data)
            await user.save()
            console.log(user)
        }

        // Si el usuario en BD 
        if (!user.state) {
            return res.status(401).json({
                msg: 'Hable con el ADMINISTRADOR - usuario bloqueado'
            })
        }

        // Generar el jwt
        const token = await generateJWT(user.id)


        res.json({
            msg: 'todo ok, Google SignIn',
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    } */
}

module.exports = {
    loginController,
    googleSingIn
}