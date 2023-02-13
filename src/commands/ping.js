// const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'this is a ping command!',
    execute(message) {
        message.channel.send("received.");
    }
}

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('Return my ping!'),
//     async execute(interaction, client) {
//         const message = await interaction.deferReply({
//             fetchReply: true,
//             content: "PING received"
//         });
//     }
// }