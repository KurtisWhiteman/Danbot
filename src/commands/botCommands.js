module.exports = {
    name: 'botCommands',
    description: 'This command is used to see all available commands',
    execute(message, args) {
        message.channel.send("G'day, Dan here.\n" +
        "You can use !ping to get a response from me checking I'm online\n" +
        "!daily-cases to get todays stats for Covid in Australia\n" +
        "Then if you add the state suffix like '-WA' you can get the stats for each individual state\n" +
        "Cheers");
    }
}