const jwt = require('jsonwebtoken')

// Como el paquete JWT no funciona en base a promesas, debemos generarla automaticamente.
// Generamos la fn y le colocamos un return nw Promises, con su respectivo resolve and reject, para usar await en la fn del controlador.
const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        // Primero generamos lo que grabaremos en el payload.
        const payload = { uid }
        // Este es el metodo del paquete para generar el token. 1er param se le pasa el payload(definido arriba), 2do param la llave secreta  que se coloca en las variables
        // de entorno, y un 3er param donde se le pone diversas caracteristicas, en este caso, el expireIn que nos indica la caducidad del token.
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}