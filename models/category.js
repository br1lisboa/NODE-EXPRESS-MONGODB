// IMPORTS //

// Schema > Un esquema en Mongoose es una estructura JSON que contiene información acerca de las propiedades de un documento. Puede también contener información acerca de la validación y de los valores por default, y si una propiedad en particular es requerida.
// Model > Los modelos son constructores sofisticados compilados a partir de definiciones de Schema . Una instancia de un modelo se llama documento . Los modelos son responsables de crear y leer documentos de la base de datos MongoDB subyacente.
const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Category', CategorySchema)