const { Category } = require('../models')
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

const isAdminUserByRole = async (role = 'ADMIN_ROLE') => {
    const userValid = await User.findOne({ role })
    if (!userValid) {
        throw new Error('El usuario no tiene un rol valido para esta operacion')
    }
}

// Este validador es para verificar si existe el ID en mi BD de categorias
const isValidCategoryById = async (id) => {
    const categValid = await Category.findById(id)
    if (!categValid) {
        throw new Error(`No existe categoria con el ID ${id}`)
    }
}

module.exports = {
    isValidRole,
    isValidMail,
    isValidUserById,
    isValidCategoryById,
    isAdminUserByRole
}