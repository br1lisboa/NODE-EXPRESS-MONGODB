// Schema > Estructura JSON que contiene inf sobre propiedades de un doc. Validaciones y valores por default.
// Model > Crea y lee docs de la BD de Mongo. Son constructores.
const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio.'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        // Hace referencia al tipo del shema USER, objectID
        type: Schema.Types.ObjectId,
        // La ref hace referencia a que coleccion SCHEMA es.
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    availabe: { type: Boolean, default: true },
    img: { type: String }
})

// Con esta funcion sacamos datos que NO queremos que lleguen a la data
ProductSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject()
    return data
}


module.exports = model('Product', ProductSchema)