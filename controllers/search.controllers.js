const { response, request } = require("express");


const search = (req = request, res = response) => {

    res.json({
        msg: 'buscar...'
    })
}


module.exports = {
    search
}