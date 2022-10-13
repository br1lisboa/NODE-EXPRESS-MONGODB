
const validateJWT = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/validate-role')
const validateInp = require('../middlewares/validate-inp')

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateInp
}