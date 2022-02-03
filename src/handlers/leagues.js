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
  console.log(`code: ${event.pathParameters.code}`)
  let res = await ddb.getItem({
    TableName: LEAGUES_TABLE_NAME,
    Key: {
      League_Short: { S: event.pathParameters.code }
    }
  })
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(unmarshall(res.Item))
  }
}
