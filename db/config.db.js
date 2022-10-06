const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /* useCreateIndex: true,
            useFindAndModify: false */
        })
        console.log('BD online!')
    } catch (error) {
        console.log(error)
        throw new Error('Error al intentar inciar la base de datos.')
    }
}

module.exports = {
    dbConnection
}