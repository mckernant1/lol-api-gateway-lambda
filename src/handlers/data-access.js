const {DynamoDB} = require('@aws-sdk/client-dynamodb')
const AWS = require('aws-sdk')


exports.ddb = new DynamoDB({

});

exports.GAMES_TABLE_NAME = 'Games'

exports.LEAGUES_TABLE_NAME = 'Leagues'

exports.PLAYERS_TABLE_NAME = 'Players'

exports.TEAMS_TABLE_NAME = 'Teams'

exports.TOURNAMENTS_TABLE_NAME = 'Tournaments'

