const mongoose = require('mongoose');

const Connection = {

    dataBaseConnectionMongoDB: () => {
        mongoDBConnection = mongoose.connect('mongodb://localhost/tasks', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log("Conexão estabelecida com MongoDB")
        })
        .catch((error) => {
            console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`)
        })
    }
}

module.exports =  Connection;