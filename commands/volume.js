var {musicError, musicVolume} = require('./msgs.js');

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
      return msg.reply(musicError).then (message => message.delete({ timeout: 20000 }));
    }
    const volume = Number(args.join(" "));
    if (isNaN(volume) || volume < 0 || volume > 10) {
      return msg.reply(musicVolume).then (message => message.delete({ timeout: 20000 }));
    }
    queue.dispatcher.setVolume(volume / 10);
    queue.volume = volume;
    bot.queues.set(msg.guild.id, queue);
    msg.react("💙");
  };

module.exports = {
    name: "volume",
    help: "Ajuste o volume da música",
    group: "music",
    execute,
}