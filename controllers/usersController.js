const randomUsers = require('../services/randomUsers')

let client = require('redis').createClient(process.env.REDISTOGO_URL);
const KEY_CACHE = "/get"

exports.get = async (req, res, next) => {
    client.get(KEY_CACHE, async (error, redisGetResponse) => {
        if (error) {
            res.status(500).send({ ok: false, error: error, data: null });
            return;
        }
        if (redisGetResponse) {
            res.status(200).send({ ok: true, error: null, data: redisGetResponse });
        }
        else {
            try {
                let usersApi = await randomUsers.getUsers(req.results);
                client.set(KEY_CACHE, JSON.stringify(usersApi), (error, redisSetResponse) =>{
                    if(error){
                        res.status(500).send({ ok: false, error: error, data: null });
                    }
                    res.send({ ok: true, error: null, data: usersApi });
                })
                
            }
            catch (error) {
                console.error(`[userController.get] error:${error.message}`);
            
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
            
        }
    })
}