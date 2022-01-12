const axios = require('axios');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const { httpMethod, queryStringParameters, body } = event
    if (httpMethod === 'POST') {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Hello there` })
      }
    }
    return { statusCode: 404 };


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
