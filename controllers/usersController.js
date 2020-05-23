const randomUsers = require('../services/randomUsers')

exports.get = async (req, res, next) => {
    try {
        // CONSULTAR REDIS
        // SI NO EXISTE => CONSULTAR API Y GUARDAR EN REDIS
        let usersApi = await randomUsers.getUsers(req.results)
        // GENERAR RESPUESTA
        res.send({ ok: true, error: null, data: usersApi });
    }
    catch (error) {
        console.error(`[userController.get] error:${error.message}`);

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}