const {ddb, TEAMS_TABLE_NAME} = require("./data-access");
const {unmarshall} = require("@aws-sdk/util-dynamodb");


exports.getAllTeams = async (event) => {
  let res = await ddb.scan({
    TableName: TEAMS_TABLE_NAME
  });
  const x = res.Items.map(it => unmarshall(it))
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(x)
  };
}

exports.getTeam = async (event) => {
  let res = await ddb.getItem({
    TableName: TEAMS_TABLE_NAME,
    Key: {
      teamId: {S: event.pathParameters.teamId}
    }
  });
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(unmarshall(res.Item))
  };
}
