var builder = require('botbuilder')
var weather = require('weather-js')

var todayDate = new Date();

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
        var forecastID = 0;
        var today = todayDate.getDate();
        var forecastDay = new Date(todayDate);
        switch (session.userData.day) {
            case 'Today':
                forecastDay.setDate(todayDate.getDate());
                break;
            case 'Tomorrow':
                forecastDay.setDate(todayDate.getDate() + 1);
                break;
            case 'Day after tomorrow':
                forecastDay.setDate(todayDate.getDate() + 2);
                break;
            default:
                break;
        }
        forecastDay = forecastDay.getDate();
        

        weather.find({ search: session.userData.location, degreeType: 'C' }, function (err, result) {
            if (err) console.log(err);

            if (typeof result[0] !== 'undefined') {
                //successfully print weather forecast

                for (var i = 0; i < result[0].forecast.length; i++) {
                    var day = result[0].forecast[i].date.split('-')[2];  //third array value of the split date string is the day value

                    if (day == today) {
                        //if the day has been found, remember the array ID in forecast[]
                        forecastID = i;
                    }
                }

                session.send(
                    'Fetching forecast data for ' +
                    session.userData.day +
                    ' in ' +
                    result[0].current.observationpoint +
                    '...\n\n\nOn ' +
                    result[0].forecast[forecastID].day +
                    ' temperature in ' +
                    result[0].location.name +
                    ' is ' +
                    result[0].forecast[forecastID].low +
                    'C - ' +
                    result[0].forecast[forecastID].high +
                    'C.'
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





