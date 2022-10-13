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
            msg:`El ${name} no es ADMINISTRADOR - No puede hacer esto`
        })
    }

    next()
}

module.exports = {
    validateRole
}