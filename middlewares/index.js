
const validateJWT = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/validate-role')
const validateInp = require('../middlewares/validate-inp')
const validateArch = require('../middlewares/validate-archive')

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateInp,
    ...validateArch
}