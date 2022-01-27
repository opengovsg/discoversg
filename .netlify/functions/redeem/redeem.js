const { isValidRedemptionCode, markRedemptionCodeAsRedeemed, markRedemptionCodeAsAvailable } = require('../dynamodb');
const { sendToAddress } = require('../services')

// Function to handler redemption of NFTs with codes
const handler = async (event) => {
  try {
    const { httpMethod } = event
    if (httpMethod === 'POST') {

      const body = JSON.parse(event.body)
      // Check required fields present
      if (!body || !body.code || !body.address) {
        return { statusCode: 400 }
      }

      const redemptionCode = body.code
      // await markRedemptionCodeAsAvailable(redemptionCode)

      const redemptionValid = await isValidRedemptionCode(redemptionCode)

      // Check redemption code is not used
      if (!redemptionValid) return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Code is invalid or has already been redeemed` })
      }

      // Mark redemption code as used
      const tokenId = await markRedemptionCodeAsRedeemed(redemptionCode)

      // Send NFT to address
      sendToAddress(body.address, tokenId)

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `NFT redeemed successfully`, address: body.address })
      }
    }
    return { statusCode: 404 };


  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
