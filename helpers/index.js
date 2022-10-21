
const dbValidators = require('./db-validators')
const JWTgenerator = require('./generator-jwt')
const GoogleVerify = require('./google-verify')
const fileUP = require('./up-file')

// Los desparramo para poder acceder a todas las fn que contengan
module.exports = {
    ...dbValidators,
    ...JWTgenerator,
    ...GoogleVerify,
    ...fileUP
}