var firebaseToken = async (req, res, next) => {
    try {
        // VALIDAR TOKEN
        // SI ES VALIDO, SEGUIR
        next();
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