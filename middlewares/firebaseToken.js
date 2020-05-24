const firebaseClient = require('../services/firebase')

var firebaseToken = async (req, res, next) => {
    if(!req.get("token_id")){
        let error = new Error("Usuario no autenticado");
        error.statusCode = 401;
        next(error);
    }

    try {
        // VALIDAR TOKEN
        var token = req.get("token_id");
        var users = await firebaseClient.getUsers(token);
        // SI ES VALIDO, SEGUIR
        if(users.length >= 1){
            next();
        }
        // SE NO ES VALIDO, RETORNAR 401
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports.firebaseToken = firebaseToken;