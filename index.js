var builder = require('botbuilder')
var weather = require('weather-js');

var inMemoryStorage = new builder.MemoryBotStorage()
var weatherVariable;
/*var weatherVariable =
    [
        {
            "location": {
                "name": "Kaunas, Lithuania",
                "lat": "54.895",
                "long": "23.91",
                "timezone": "3",
                "alert": "",
                "degreetype": "C",
                "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
            },
            "current": {
                "temperature": "5",
                "skycode": "32",
                "skytext": "Sunny",
                "date": "2018-04-11",
                "observationtime": "09:50:00",
                "observationpoint": "Kaunas, Lithuania",
                "feelslike": "1",
                "humidity": "59",
                "winddisplay": "21 km/h East",
                "day": "Wednesday",
                "shortday": "Wed",
                "windspeed": "21 km/h",
                "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/32.gif"
            },
            "forecast": [
                {
                    "low": "1",
                    "high": "16",
                    "skycodeday": "29",
                    "skytextday": "Partly Cloudy",
                    "date": "2018-04-10",
                    "day": "Tuesday",
                    "shortday": "Tue",
                    "precip": ""
                },
                {
                    "low": "3",
                    "high": "11",
                    "skycodeday": "32",
                    "skytextday": "Sunny",
                    "date": "2018-04-11",
                    "day": "Wednesday",
                    "shortday": "Wed",
                    "precip": "0"
                },
                {
                    "low": "4",
                    "high": "12",
                    "skycodeday": "26",
                    "skytextday": "Cloudy",
                    "date": "2018-04-12",
                    "day": "Thursday",
                    "shortday": "Thu",
                    "precip": "0"
                },
                {
                    "low": "6",
                    "high": "15",
                    "skycodeday": "26",
                    "skytextday": "Cloudy",
                    "date": "2018-04-13",
                    "day": "Friday",
                    "shortday": "Fri",
                    "precip": "0"
                },
                {
                    "low": "8",
                    "high": "17",
                    "skycodeday": "30",
                    "skytextday": "Partly Sunny",
                    "date": "2018-04-14",
                    "day": "Saturday",
                    "shortday": "Sat",
                    "precip": "50"
                }
            ]
        },
        {
            "location": {
                "name": "Kauno, Lithuania",
                "lat": "55.077",
                "long": "23.882",
                "timezone": "3",
                "alert": "",
                "degreetype": "C",
                "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
            },
            "current": {
                "temperature": "6",
                "skycode": "32",
                "skytext": "Sunny",
                "date": "2018-04-11",
                "observationtime": "10:20:00",
                "observationpoint": "Kauno",
                "feelslike": "2",
                "humidity": "60",
                "winddisplay": "26 km/h East",
                "day": "Wednesday",
                "shortday": "Wed",
                "windspeed": "26 km/h",
                "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/32.gif"
            },
            "forecast": [
                {
                    "low": "3",
                    "high": "17",
                    "skycodeday": "29",
                    "skytextday": "Partly Cloudy",
                    "date": "2018-04-10",
                    "day": "Tuesday",
                    "shortday": "Tue",
                    "precip": ""
                },
                {
                    "low": "3",
                    "high": "12",
                    "skycodeday": "32",
                    "skytextday": "Sunny",
                    "date": "2018-04-11",
                    "day": "Wednesday",
                    "shortday": "Wed",
                    "precip": "0"
                },
                {
                    "low": "7",
                    "high": "12",
                    "skycodeday": "28",
                    "skytextday": "Mostly Cloudy",
                    "date": "2018-04-12",
                    "day": "Thursday",
                    "shortday": "Thu",
                    "precip": "0"
                },
                {
                    "low": "7",
                    "high": "15",
                    "skycodeday": "26",
                    "skytextday": "Cloudy",
                    "date": "2018-04-13",
                    "day": "Friday",
                    "shortday": "Fri",
                    "precip": "0"
                },
                {
                    "low": "9",
                    "high": "17",
                    "skycodeday": "30",
                    "skytextday": "Partly Sunny",
                    "date": "2018-04-14",
                    "day": "Saturday",
                    "shortday": "Sat",
                    "precip": "60"
                }
            ]
        }
    ]
;
*/

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
            //console.log(JSON.stringify(result, null, 2));
            weatherVariable = JSON.parse(result);
        })
        
        session.send(
            'Location: ' +
            weatherVariable[0].current.skytext +
            ".......... Forecast for " +
            session.userData.day +
            '.'
        )
    }
]).set('storage', inMemoryStorage) // Register in memory storage





