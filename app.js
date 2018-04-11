
var builder = require('botbuilder')
var weather = require('weather-js')

var today = new Date();

// Bot Storage: Here we register the state storage for your bot.
// Default store: volatile in-memory store - Only for prototyping!
var inMemoryStorage = new builder.MemoryBotStorage()

// Setup bot and root waterfall
var connector = new builder.ConsoleConnector().listen()
var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, "what city?")
    },
    function (session, results) {
        session.userData.location = results.response
        weather.find({ search: results.response, degreeType: 'C' }, function (err, result) {
            if (err) console.log(err);

            if (typeof result[0] !== 'undefined') {
                //successfully print weather forecast
                console.log(JSON.stringify(result, null, 2));
                session.send(
                    "\n\n\n\n\nhere is today's date" +
                    today.getDate()
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
