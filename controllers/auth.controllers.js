const { response } = require('express')

const loginController = (req, res = response) => {

    res.json({
        msg: 'Login ok'
    })

}

module.exports = {
    loginController
}