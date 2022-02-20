const {ddb, LEAGUES_TABLE_NAME} = require("./data-access");
const {unmarshall} = require("@aws-sdk/util-dynamodb");


exports.getAllLeagues = async (event) => {
  let res = await ddb.scan({
    TableName: LEAGUES_TABLE_NAME
  });
  const x = res.Items.map(it => unmarshall(it))
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(x)
  };
}

exports.getLeague = async (event) => {
  console.log(`code: ${event.pathParameters.leagueId}`)
  let res = await ddb.getItem({
    TableName: LEAGUES_TABLE_NAME,
    Key: {
      leagueId: { S: event.pathParameters.leagueId }
    }
  })
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(unmarshall(res.Item))
  }
}
