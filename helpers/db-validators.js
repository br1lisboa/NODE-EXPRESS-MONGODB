const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({ role })
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`)
    }
}

const isValidMail = async (mail = '') => {
    const mailExist = await User.findOne({ mail })
    if (mailExist) {
        throw new Error(`El correo: ${mail}, ya esta registrado`)
    }
}

const isValidUserById = async (id = '') => {
    const userValid = await User.findById(id)
    if (!userValid) {
        throw new Error(`El ID: ${id}, no corresponde a un usuario existente`)
    }
}

module.exports = {
    isValidRole,
    isValidMail,
    isValidUserById
}