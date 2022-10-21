const path = require('path')
const { v4: uuidv4 } = require('uuid');

const upFile = (files, validExt = ['png', 'jpg', 'jpeg', 'gif'], subCarpet = '') => {

    return new Promise((resolve, reject) => {

        const { archive } = files;

        // Con el SPLIT cortamos la cadena de texto segun el parametro que le pasamos, y lo colocamos en un array
        const cutName = archive.name.split('.')
        // De esta manera extraemos la ultima posicion del arreglo, nuestra extension
        const ext = cutName[cutName.length - 1]

        // Validar la extension
        if (!validExt.includes(ext)) {
            return reject(`La extension ${ext} no es permitida, ${validExt} solo son validos.`)
        }

        // Con esta constante creamos un ID para nuestros archivos que subimos
        const temporalName = uuidv4() + '.' + ext

        // Construccion del path donde quiero colocar el archivo
        const uploadPath = path.join(__dirname, '../uploads/', subCarpet, temporalName);

        // Esta fn mv sirve para mover el archivo donde lo quiero colocar
        archive.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(temporalName)
        });

    })

}

module.exports = {
    upFile
}