var {musicError} = require('./msgs.js');

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
      return msg.reply(musicError).then (message => message.delete({ timeout: 20000 }));
    }

    queue.songs = [];
    bot.queues.set(msg.guild.id, queue);
    queue.dispatcher.end();

}

module.exports = {
  name: "stop",
  help: "Pare a fila de músicas",
  aliases: ["parar"],
  category: "music",
  execute,
}