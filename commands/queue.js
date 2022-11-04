var {musicError} = require('./msgs.js');
const playSong = require("./play").playSong;
const MessageEmbed = require ("discord.js").MessageEmbed;

const author = "Mynth Music - Youtube";
const avatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";
const color = "0x0099ff";

const execute = async (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if(!msg.member.voice.channel) return msg.reply ("Você não está em um canal de voz!");
    
    if(!queue) return msg.reply("Não há música tocando!");
    
    if(queue) {
        const iterator = queue.songs.values();
        for (const value of iterator) {

            msg.channel.send(`${value[0].length}) ${value.title}`);
            console.log(value);
        }
        
    }
    
    // }
    
    // console.log(user.qV);
};

module.exports = {
    name: "queue",
    help: "Veja a lista",
    aliases: "q",
    category: "music",
    execute,
}                    

