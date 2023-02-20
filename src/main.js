require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const wtf = require('./commands/writeToFile.js');

const bot = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`../src/commands/${file}`);

    bot.commands.set(command.name, command);
}

let version = '1.0.1';

const PREFIX = '!';

bot.once('ready', () => {
    console.log("Covid Bot Online");
})

bot.on('messageCreate', message => {
    console.log('reading message...');
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const command = message.content.slice(PREFIX.length)
                    .split(/ +/)
                    .shift()
                    .toLowerCase();
    console.log(`command is: ${command}`);

    whichCommand(message, command);
})

function whichCommand(message, command) {
    switch(command) {
        case "ping":
            bot.commands.get('ping').execute(message);
            return;
        case "commands":
            bot.commands.get('botCommands').execute(message, command);
            return;
        case "daily-cases":
            var file = fs.existsSync(`./src/files/` + command + `.json`);
            if (!file) {
                console.log("NO FILE FOUND RETURNING FALSE");
            }
            bot.commands.get('getCovidStats').execute(message, command);
            return;
        case "<:kekw:821701258599202826>":
            if(message.author.bot) return;
            message.channel.send("<:kekw:821701258599202826>");
    }
}

// to do
// Do the call once and save the stats to a file to access
// Error handling for a timeout

bot.login(token);
