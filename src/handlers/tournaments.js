const {ddb, TOURNAMENTS_TABLE_NAME} = require("./data-access");
const {Tournament} = require("@mckernant1/lol_esports_api");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

exports.getTournamentsForLeague = async (event) => {
  let res = await ddb.query({
    TableName: TOURNAMENTS_TABLE_NAME,
    KeyConditionExpression: `League = :desiredLeague`,
    ExpressionAttributeValues: {
      ':desiredLeague': event.pathParameters.League
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(res.Items.map(it => unmarshall(it)))
  };
}
