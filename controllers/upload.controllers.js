
const { request, response } = require("express");
const { upFile } = require("../helpers");

const uploadFile = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        res.status(400).json({ msg: 'No hay archivos en la peticion para ser subidos' });
        return;
    }

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

module.exports = {
    uploadFile
}
