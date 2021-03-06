const {ddb, PLAYERS_TABLE_NAME, PLAYERS_TABLE_TEAM_INDEX} = require("./data-access");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

exports.getPlayersOnTeam = async (event) => {
  let res = await ddb.query({
    TableName: PLAYERS_TABLE_NAME,
    IndexName: PLAYERS_TABLE_TEAM_INDEX,
    KeyConditionExpression: `teamId = :desiredTeam`,
    ExpressionAttributeValues: {
      ':desiredTeam': { S: event.pathParameters.teamId }
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(res.Items.map(it => unmarshall(it)))
  };
}
