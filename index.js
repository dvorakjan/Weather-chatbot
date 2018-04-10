var builder = require('botbuilder')
var weather = require('weather-js');



var inMemoryStorage = new builder.MemoryBotStorage()


// Setup bot and root waterfall
var connector = new builder.ConsoleConnector().listen()
var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, "What country?")
    },
    function (session, results) {
        session.userData.location = results.response
        builder.Prompts.choice(session, 'Are you interested in forecast of: ', [
            'Today',
            'Tomorrow',
            'Day after tomorrow'
        ])
    },
    function (session, results) {
        session.userData.day = results.response.entity
        weather.find({ search: session.userData.location, degreeType: 'C' }, function (err, result) {
            if (err) console.log(err);
            console.log(JSON.parse(result));
        })
        session.send(
            'Location: ' +
            session.userData.weather +//.forecast[0].high +
            //'Location2: ' +
            //session.userData.weather["low"] +
            ".......... Forecast for " +
            session.userData.day +
            '.'
        )
    }
]).set('storage', inMemoryStorage) // Register in memory storage
