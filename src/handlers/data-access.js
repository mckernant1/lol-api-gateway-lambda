const {DynamoDB} = require('@aws-sdk/client-dynamodb')
const AWS = require('aws-sdk')


exports.ddb = new DynamoDB({

});

exports.MATCHES_TABLE_NAME = 'Matches'

exports.LEAGUES_TABLE_NAME = 'Leagues'

exports.PLAYERS_TABLE_NAME = 'Players'
exports.PLAYERS_TABLE_TEAM_INDEX = 'teamId-id-index'

exports.TEAMS_TABLE_NAME = 'Teams'

exports.TOURNAMENTS_TABLE_NAME = 'Tournaments'

