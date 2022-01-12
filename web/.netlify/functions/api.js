const axios = require('axios');


/**
 * Netlify function for availability API call
 */
exports.handler = async function (event, context) {
    try {
        const { httpMethod, queryStringParameters, body } = event
        if (httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    test: 'Ok'
                })
            };
        }
        return { statusCode: 404 };
    } catch (err) {
        console.log(err.response)
        return { statusCode: 400 };
    }


}