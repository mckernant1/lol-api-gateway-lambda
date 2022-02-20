const {ddb, MATCHES_TABLE_NAME} = require("./data-access");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

exports.getMatchesForTournament = async (event) => {

  let res = await ddb.query({
    TableName: MATCHES_TABLE_NAME,
    KeyConditionExpression: `tournamentId = :desiredTourney`,
    ExpressionAttributeValues: {
      ':desiredTourney': { S: event.pathParameters.tournamentId }
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(res.Items.map(it => unmarshall(it)))
  };
}
