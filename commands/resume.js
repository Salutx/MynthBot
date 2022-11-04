var {musicError, musicNotPaused, musicResumed} = require('./msgs.js');

const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply(musicError).then (message => message.delete({ timeout: 20000 }));
    };
    
    if(!queue.dispatcher.pause) {
        return msg.reply(musicNotPaused).then (message => message.delete({ timeout: 20000 }));
    };

    queue.dispatcher.resume();
        msg.reply (musicResumed).then (message => message.delete({ timeout: 20000 }));
};

module.exports = {
    name: "resume",
    help: "Despause a música",
    category: "music",
    execute,
};