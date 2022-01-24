const {ddb, GAMES_TABLE_NAME} = require("./data-access");
const {Game, Tournament} = require("@mckernant1/lol_esports_api");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

exports.getGamesForTournament = async (event) => {
  let res = await ddb.query({
    TableName: GAMES_TABLE_NAME,
    KeyConditionExpression: `Tournament = :desiredTourney`,
    ExpressionAttributeValues: {
      ':desiredTourney': event.pathParameters.Tournament
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(res.Items.map(it => unmarshall(it)))
  };
}
