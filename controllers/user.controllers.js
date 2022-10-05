const { response, request } = require('express')

const userGet = (req = request, res = response) => {
    const query = req.query // esto tambien se puede desestructurar
    res.json({
        ok: true,
        msg: 'get Api - controller',
        query
    })
}

const userPost = (req = request, res = response) => {
    const body = req.body // esto se puede desestructurar
    res.json({
        ok: true,
        msg: 'post Api',
        body
    })
}

const userPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        ok: true,
        msg: 'put Api',
        id
    })
}


const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete Api'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch Api'
    })
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}