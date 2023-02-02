const { Client, Collection } = require('discord.js');
// const botIntents = new Intents();
// botIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES);
const bot = new Client();

const token = 'ODkxNjEwNDU1OTI2MjcyMDIw.YVA28g.qlpCctvLgONl66DuNhl4vK8nWpQ';

const fs = require('fs');
const wtf = require('./commands/writeToFile.js');
// const now = new Date();
// const millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
// if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
// }
// setTimeout(function(){
//     command = "daily-cases";
//     bot.commands.get('getCovidStats').execute(message, command);
// }, millisTill10);

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

var version = '1.0.1';

const PREFIX = '!';

bot.once('ready', () => {
    console.log("Covid Bot Online");
})

bot.on('message', message => {
    console.log('reading message...');
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(`command is: ${command}`)

    if (command === 'ping') {
        bot.commands.get('ping').execute(message, args);
    }
})

bot.on('message', message => {
    console.log('reading message...');
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(`command is: ${command}`)
    if (command.includes('daily-cases')) {
        trueOrFalse = checkForCovidData(command);
        console.log(trueOrFalse)
        console.log("trueOrFalse")
        bot.commands.get('getCovidStats').execute(message, command, trueOrFalse);
    }
})

bot.on('message', message => {
    console.log('reading message...');
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(`command is: ${command}`)
    if (command === 'commands') {
        bot.commands.get('botCommands').execute(message, command);
    }
})

bot.on('message', message => {
    console.log('reading message...');
    if(message.author.bot) return;

    const command = message.content.toLowerCase();
    console.log(`command is: ${command}`)

    if (command === '<:kekw:821701258599202826>') {
        message.channel.send("<:kekw:821701258599202826>");
    }
})

async function checkForCovidData (command) {
    var file = fs.existsSync(`./files/` + command + `.json`);
    if (!file) {
        console.log("NO FILE FOUND RETURNING FALSE")
        return false;
    }
    console.log("FOUND A FILE")
    try {
        return await getDataFromFile(`./files/` + command + `.json`)
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}

async function getDataFromFile (filePath) {
    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {
        console.error(err)
        return
        }
        console.log("ttt")
        console.log(data)
        return data
    })
}

// to do
// Do the call once and save the stats to a file to access
// Error handling for a timeout

bot.login(token);