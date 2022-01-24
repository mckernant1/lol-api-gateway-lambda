const {ddb, PLAYERS_TABLE_NAME} = require("./data-access");
const {Tournament, League} = require("@mckernant1/lol_esports_api");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

exports.getPlayersOnTeam = async (event) => {
  let res = await ddb.query({
    TableName: PLAYERS_TABLE_NAME,
    KeyConditionExpression: `Team = :desiredTeam`,
    ExpressionAttributeValues: {
      ':desiredTeam': event.pathParameters.Team
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(res.Items.map(it => unmarshall(it)))
  };
}
