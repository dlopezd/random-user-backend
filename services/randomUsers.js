const config = require('config');
const axios = require('axios')


const baseUrlApi = config.rest_endpoints.random_user;

const getUsers = async (results) => {
    const quatity = `?results=${results ? results : 10}`
    try {
        let response = await axios({
            method: 'get',
            url: baseUrlApi + quatity,
        });

        return response.data.results;

    } catch (error) {
        let err = new Error("Error al obtener usuarios desde la api");
        err.statusCode = 503;
        throw err;
    }
}

module.exports.getUsers = getUsers;