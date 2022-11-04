const playSong = require("./play").playSong;
var {musicError} = require('./msgs.js');

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) return msg.reply (musicError);

    queue.songs.shift();
    bot.queues.set(msg.guild.id, queue);
    playSong(bot, msg, queue.songs[0]);
}

module.exports = {
    name: "skip",
    help: "Pule uma música",
    category: "music",
    execute,
}