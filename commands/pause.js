var {musicError, musicPaused} = require('./msgs.js');
const { stripIndents } = require("common-tags");
const { RichEmbed } = require("discord.js"); 

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if(!queue) {
        return msg.reply(musicError).then (message => message.delete({ timeout: 20000 }));
    }

    queue.dispatcher.pause()
        return msg.reply (musicPaused).then (message => message.delete({ timeout: 20000 }));
};

module.exports = {
    name: "pause",
    help: "Pause as músicas",
    category: "music",
    execute,
}