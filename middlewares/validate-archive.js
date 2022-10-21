const { response } = require("express")


const validateArch = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion para ser subidos - validateArch' })
    }

}

module.exports = {
    validateArch
}