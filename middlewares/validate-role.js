const { request, response } = require("express")


const validateRole = (req = request, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { role, name } = req.userAuth

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El ${name} no es ADMINISTRADOR - No puede hacer esto`
        })
    }

    next()
}

//Utilizacion del rest operator (cuando se manda por params agarra todos y los almacena en un array)
const haveRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.userAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        // Utilizamos el include sobre el array roles negandolo para recorrelo y si NO incluye un rol el auth dentro de los roles permitidos, reviente.
        if (!roles.includes(req.userAuth.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        console.log(roles, req.userAuth.role)

        next()
    }
}

module.exports = {
    validateRole,
    haveRole
}