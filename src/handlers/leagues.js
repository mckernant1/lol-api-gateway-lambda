const {ddb, LEAGUES_TABLE_NAME} = require("./data-access");
const {League} = require("@mckernant1/lol_esports_api");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");


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
  let res = await ddb.getItem({
    TableName: LEAGUES_TABLE_NAME,
    Key: event.pathParameters.code
  })
  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(unmarshall(res.Item))
  }
}
