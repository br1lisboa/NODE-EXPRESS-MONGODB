const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config.db')
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.usersRoutePath = '/api/user'
        this.authPath = '/api/auth'
        this.categoryPath = '/api/category'
        this.productPath = '/api/products'
        this.search = '/api/search'
        this.upload = '/api/uploads'

        // Conectar a BD
        this.connectBD()

        // Middlewares
        this.middlewares()

        // Rutas de mi app
        this.routes()
    }

    async connectBD() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())
        // Lectura y pareseo del body
        this.app.use(express.json())
        // Directorio publico
        this.app.use(express.static('public'))
        // Maneja el FileUploads
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            // Esta configuracion en true permite a fileUpload que cree directorios si no existen.
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.upload, (require('../routes/upload.routes')))
        this.app.use(this.authPath, (require('../routes/auth.routes')))
        this.app.use(this.usersRoutePath, (require('../routes/user.routes')))
        this.app.use(this.categoryPath, (require('../routes/category.routes')))
        this.app.use(this.productPath, (require('../routes/product.routes')))
        this.app.use(this.search, (require('../routes/search.routes')))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`server corriendo en puerto: ${this.port}`)
        })
    }

}

module.exports = Server