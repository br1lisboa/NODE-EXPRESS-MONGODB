const path = require('path')

const { request, response } = require("express")

const uploadFile = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        res.status(400).json({ msg: 'No hay archivos en la peticion para ser subidos' });
        return;
    }

    const { archive } = req.files;

    // Construccion del path donde quiero colocar el archivo
    const uploadPath = path.join(__dirname, '../uploads/', archive.name);

    // Esta fn md sirve para mover el archivo donde lo quiero colocar
    archive.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ msg: 'El archivo se subio a ' + uploadPath });
    });

}

module.exports = {
    uploadFile
}
