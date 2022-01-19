
const { getTokensForAddress } = require('../services')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const { httpMethod, queryStringParameters } = event
    if (httpMethod === 'GET') {
      const address = queryStringParameters.address
      // Check required fields present
      if (!address) {
        return { statusCode: 400 }
      }

      // Get JSON data for all tokens the address holds
      const res = await getTokensForAddress(address)

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res)
      }
    }
    return { statusCode: 404 };


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
