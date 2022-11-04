const Discord = require('discord.js');

const execute = (bot, message, args) => {
    const me = message.author.bot;
    if(!message.guild.me.voice.channel) return message.reply("não estou em um canal de áudio.");
    message.guild.me.voice.channel.leave();
}

module.exports = {
    name: "disconnect",
    memberName: "leave",
    group: "musica",
    execute,
};