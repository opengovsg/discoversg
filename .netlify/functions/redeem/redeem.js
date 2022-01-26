const axios = require('axios');
const { isValidRedemptionCode, markRedemptionCodeAsRedeemed } = require('../dynamodb');
const { sendToAddress } = require('../services')

// Function to handler redemption of NFTs with codes
const handler = async (event) => {
  try {
    const { httpMethod, queryStringParameters } = event
    if (httpMethod === 'POST') {

      const body = JSON.parse(event.body)
      // Check required fields present
      if (!body || !body.code || !body.address) {
        return { statusCode: 400 }
      }

      const redemptionCode = body.code

      const redemptionValid = await isValidRedemptionCode(redemptionCode)

      // Check redemption code is not used
      if (!redemptionValid) return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Code is invalid` })
      }

      // Mark redemption code as used
      await markRedemptionCodeAsRedeemed(redemptionCode)

      // Get tokenId from DynamoDB
      const tokenId = 1

      // Send NFT to address
      const res = await sendToAddress(body.address, tokenId)

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `NFT redeemed successfully`, address: body.address })
      }
    }
    return { statusCode: 404 };


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
