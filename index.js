var builder = require('botbuilder')
var weather = require('weather-js')

var inMemoryStorage = new builder.MemoryBotStorage()




// Setup bot and root waterfall
var connector = new builder.ConsoleConnector().listen()
var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, "What city?")
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
            
            session.send('Location: ' +
                result[0].location.name +
                ".......... Forecast for " +
                session.userData.day +
                '.'
            )
            
        });
        

    }
]).set('storage', inMemoryStorage) // Register in memory storage





