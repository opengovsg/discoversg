const { DynamoDBClient, GetItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb')

const {
  DISCOVERSG_KEY_ID,
  DISCOVERSG_KEY_SECRET,
  DYNAMODB_TABLE,
} = process.env

const client = new DynamoDBClient({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: DISCOVERSG_KEY_ID,
    secretAccessKey: DISCOVERSG_KEY_SECRET,
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
 * @returns {Promise<string>}
 * @throws if redemption code does not exist or status is not 'AVAILABLE', or when
 * tokenId is missing after the update.
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
    ReturnValues: 'ALL_NEW',
  }
  const { Attributes } = await client.send(new UpdateItemCommand(params))
  if (!Attributes || !Attributes.tokenId || !Attributes.tokenId.S) {
    throw new Error('Redemption code does not have token ID.')
  }
  return Attributes.tokenId.S
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
