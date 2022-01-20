const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb')

const { DYNAMODB_TABLE } = process.env

const client = new DynamoDBClient({ region: "ap-southeast-1" })

async function isValidRedemptionCode(code) {
  const params = {
    TableName: DYNAMODB_TABLE,
    ConsistentRead: true,
    Key: {
      PrimaryKey: { S: "Inventory" },
      SortKey: { S: code }
    },
  }
  const { Item } = await client.send(new GetItemCommand(params))
  if (!Item || !Item.redemptionStatus || !Item.redemptionStatus.S) return false
  return Item.redemptionStatus.S === 'AVAILABLE'
}

module.exports = {
  isValidRedemptionCode,
}
