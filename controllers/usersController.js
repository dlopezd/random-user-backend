
exports.get = async (req, res, next) => {
    try {
        // CONSULTAR REDIS
        // SI NO EXISTE => CONSULTAR API Y GUARDAR EN REDIS
        // GENERAR RESPUESTA
        res.send({ ok: true, error: null, data: 'empty' });
    }
    catch (error) {
        console.error(`[userController.get] error:${error.message}`);

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}