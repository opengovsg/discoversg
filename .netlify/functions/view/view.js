const axios = require('axios');
const { getTokens } = require('../services')

// Function to get NFTs belonging to a single address
const handler = async (event) => {
  try {
    const { httpMethod, queryStringParameters } = event
    if (httpMethod === 'GET') {

      const addr = queryStringParameters.addr
      if (!addr) {
        return { statusCode: 400 }
      }

      // Get metadata of tokens with address
      const data = await getTokens()
      console.log(data);

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Hi` })
      }
    }
    return { statusCode: 404 };


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
