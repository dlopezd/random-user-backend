const config = require('config');
const axios = require('axios')

const baseUrlApi = config.rest_endpoints.firebase;
const firebase_key = config.api_key;

const getUsers = async (token) => {

    const path = `:lookup?key=${firebase_key}`
    try {
        let response = await axios({
            method: 'post',
            url: baseUrlApi + path,
            data: { idToken: token }
        });

        return response.data.users;

    } catch (error) {
        if (error.response.data.error.message == 'INVALID_ID_TOKEN') {
            error.message = "TOKEN INVALIDA";
            error.statusCode = 401;
        }
        else if (error.response.data.error.message == 'USER_NOT_FOUND') {
            error.message = "USER NOT FOUND";
            error.statusCode = 403;
        }
        else {
            error.statusCode = 503;
        }
        console.error(`Code: ${error.statusCode}, Error: ${error.message}`)
        throw error;
    }
}

module.exports.getUsers = getUsers;