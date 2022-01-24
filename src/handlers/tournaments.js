const {ddb, TOURNAMENTS_TABLE_NAME} = require("./data-access");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

exports.getTournamentsForLeague = async (event) => {
  let res = await ddb.query({
    TableName: TOURNAMENTS_TABLE_NAME,
    KeyConditionExpression: `League = :desiredLeague`,
    ExpressionAttributeValues: {
      ':desiredLeague': { S: event.pathParameters.League }
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(res.Items.map(it => unmarshall(it)))
  };
}
