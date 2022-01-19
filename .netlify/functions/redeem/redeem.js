const axios = require('axios');
const { sendToAddress } = require('../services')

// Function to handler redemption of NFTs with codes
const handler = async (event) => {
  try {
    const { httpMethod, queryStringParameters } = event
    if (httpMethod === 'POST') {

      const body = JSON.parse(event.body)
      console.log(body, body.code, body.address);
      // Check required fields present
      if (!body || !body.code || !body.address) {
        return { statusCode: 400 }
      }

      // Check redemption code is not used

      // Test Redemption Code
      if (body.code !== 'AAAA') return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Code is invalid` })
      }

      // Mark redemption code as used

      // Send NFT to address
      const res = await sendToAddress(body.address)

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `NFT redeemed to address: ${res}` })
      }
    }
    return { statusCode: 404 };


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
