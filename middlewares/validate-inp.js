const { validationResult } = require('express-validator')

const validateInp = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    // El next indica en todo middleware como 3er param para que continue con el siguiente middleware.
    next()
}

module.exports = {
    validateInp
}