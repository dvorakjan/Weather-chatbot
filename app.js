
var builder = require('botbuilder')

// Bot Storage: Here we register the state storage for your bot.
// Default store: volatile in-memory store - Only for prototyping!
var inMemoryStorage = new builder.MemoryBotStorage()

// Setup bot and root waterfall
var connector = new builder.ConsoleConnector().listen()
var bot = new builder.UniversalBot(connector, [
    function (session) {
        builder.Prompts.text(session, "Hello... What's your name?")
    },
    function (session, results) {
        session.userData.name = results.response
        builder.Prompts.number(
            session,
            'Hi ' + results.response + ', How many years have you been coding?'
        )
    },
    function (session, results) {
        session.userData.coding = results.response
        builder.Prompts.choice(session, 'What language do you code Node using?', [
            'JavaScript',
            'CoffeeScript',
            'TypeScript'
        ])
    },
    function (session, results) {
        session.userData.language = results.response.entity
        session.send(
            'Got it... ' +
            session.userData.name +
            " you've been programming for " +
            session.userData.coding +
            ' years and use ' +
            session.userData.language +
            '.'
        )
    }
]).set('storage', inMemoryStorage) // Register in memory storage
