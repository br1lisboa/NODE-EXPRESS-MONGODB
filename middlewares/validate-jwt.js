const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        // Esta fn me sirve para verificar si el token es valido, sino dispara un trhow err capturado en el catch
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // Colocamos dentro del req nuestro uid extraido del jwt.
        req.uid = uid
        // Verificiar coincidencia del uid con la bd
        const userAuth = await User.findById(uid)
        if(!userAuth){
            return res.status(401).json({
                msg:'Token no valido - usuario no existente en BD'
            })
        }
        // Verificar si el uid no esta marcado con state false
        if(!userAuth.state){
            return res.status(401).json({
                msg:'Token no valido - user state false'
            })
        }

        req.userAuth = userAuth

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    validateJWT
}