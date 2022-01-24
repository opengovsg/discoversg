const { DynamoDBClient, GetItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb')

const { DYNAMODB_TABLE } = process.env

const client = new DynamoDBClient({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.DISCOVERSG_KEY_ID,
    secretAccessKey: process.env.DISCOVERSG_KEY_SECRET,
  },
})

async function isValidRedemptionCode(code) {
  const params = {
    TableName: DYNAMODB_TABLE,
    ConsistentRead: true,
    Key: {
      PrimaryKey: { S: 'Inventory' },
      SortKey: { S: code }
    },
  }
  const { Item } = await client.send(new GetItemCommand(params))
  if (!Item || !Item.redemptionStatus || !Item.redemptionStatus.S) return false
  return Item.redemptionStatus.S === 'AVAILABLE'
}

/**
 * A conditional update to the DynamoDB table, marking status of
 * redemption code as 'REDEEMED'.
 * @param code - Sanitised redemption code.
 * @returns {Promise<void>}
 * @throws if redemption code does not exist or status is not 'AVAILABLE'.
 */
async function markRedemptionCodeAsRedeemed(code) {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      PrimaryKey: { S: 'Inventory' },
      SortKey: { S: code },
    },
    ExpressionAttributeValues: {
      ':available': { S: 'AVAILABLE' },
      ':redeemed': { S: 'REDEEMED' },
    },
    ConditionExpression: 'redemptionStatus = :available',
    UpdateExpression: 'SET redemptionStatus = :redeemed',
  }
  await client.send(new UpdateItemCommand(params))
}


/**
 * Used to undo a redemption in case something went wrong with the
 * NFT minting process.
 * @param code - Sanitised redemption code.
 * @returns {Promise<void>}
 * @throws if redemption code does not exist.
 */
async function markRedemptionCodeAsAvailable(code) {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      PrimaryKey: { S: 'Inventory' },
      SortKey: { S: code },
    },
    ExpressionAttributeValues: {
      ':available': { S: 'AVAILABLE' },
    },
    ConditionExpression: 'attribute_exists(redemptionStatus)',
    UpdateExpression: 'SET redemptionStatus = :available',
  }
  await client.send(new UpdateItemCommand(params))
}

module.exports = {
  isValidRedemptionCode,
  markRedemptionCodeAsRedeemed,
  markRedemptionCodeAsAvailable,
}
