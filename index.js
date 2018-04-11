var builder = require('botbuilder')
var weather = require('weather-js')

var inMemoryStorage = new builder.MemoryBotStorage()




// Setup bot and root waterfall
var connector = new builder.ConsoleConnector().listen()
var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, "Which city would you like me to lookup?")
    },
    function (session, results) {
        session.userData.location = results.response
        builder.Prompts.choice(session, 'Display forecast for: ', [
            'Today',
            'Tomorrow',
            'Day after tomorrow'
        ])
    },
    function (session, results) {
        session.userData.day = results.response.entity

        weather.find({ search: session.userData.location, degreeType: 'C' }, function (err, result) {
            if (err) console.log(err);

            if (typeof result[0] !== 'undefined') {
                //successfully print weather forecast

                session.send(
                    'Location: ' +
                    result[0].location.name +
                    ".......... Forecast for " +
                    session.userData.day +
                    '.'
                )
            } else {
                //location unrecognised
                session.send(
                    "Sorry, but I can't recognise '" +
                    session.userData.location +
                    "' as a city."
                    )
            }
            
        });
        

    }
]).set('storage', inMemoryStorage) // Register in memory storage





