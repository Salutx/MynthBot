const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const MessageEmbed = require ("discord.js").MessageEmbed;

const author = "Mynth Music - Youtube";
const avatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";
const color = "0x0099ff";

const execute = (bot, msg, args) => {
    
    const s = args.join(" ");
    try {
        
        search(s, (err, result) => {
            
            if (err) {
                console.log(err);
                throw err;
            } else if (result && result.videos.length > 0) {
                
                if(!msg.member.voice.channel) return msg.reply ("Você não está em um canal de voz!");
                
                const song = result.videos[0];
                const queue = bot.queues.get(msg.guild.id);    

                console.log(queue);
                
                if (queue) {
                    bot.queues.set(msg.guild.id, queue);
                    queue.songs.push(song);

                    const addQueue = new MessageEmbed()
                    .setColor(color)
                    .setAuthor(author, avatar)
                    .setTitle ("Música adicionada a fila! :ballot_box_with_check: ")
                    .setDescription (`${queue.songs.length}) ${song.title}`)
                    .setFooter ("Adicionada por: " + msg.author.tag, "");
                    
                    msg.channel.send(addQueue);
                    
                } else {
                    playSong(bot, msg, song);
                }

            } else {
                const musicNotFound = new MessageEmbed()
                .setColor (color)
                .setAuthor (author, avatar)
                .setTitle ("Música não encontrada!")
                .setDescription("Não consegui encontrar nada relacionado. :disappointed_relieved:");
                msg.channel.send (musicNotFound).then (message => message.delete({ timeout: 6000 }));
            }
        });
    } catch (e) {
        const nothingUsed = new MessageEmbed()
        .setColor(color)
        .setAuthor(author, avatar)
        .setTitle("Ops! Há algo de errado...")
        .setDescription("Você não informou nenhuma música!")
        msg.reply(nothingUsed);
    }

};

const playSong = async (bot, msg, song) => {
    
    let queue = bot.queues.get(msg.member.guild.id);
    
    if(!song) {
        if (queue) {
            let timeoutID;
            timeoutID = setTimeout(() => {}, 1 * 60 * 10000)
            clearTimeout(timeoutID)
            return bot.queues.delete(msg.member.guild.id);
        }
    }
    
    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song],
            queue: [],
        };
    } 
    
    queue.dispatcher = await queue.connection.play (await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }), { type: "opus",});
    
    const msgs = new MessageEmbed()
    .setColor(color)
    .setAuthor(author, avatar)
    .setTitle("Tocando: " + song.title)
    .setImage(song.image)
    .setTimestamp(song.timestamp)
    .setDescription(song.description)
    .addField ("Canal:", song.author.name, true)
    .addField ("Postado em: ", song.ago, true)
    .addField ("Views:", song.views, true)
    .setFooter ("Tempo: " + song.timestamp, "");
    msg.channel.send (msgs).then (message => message.delete({ timeout: song.seconds * 1000 }));
    
    queue.dispatcher.on("finish", () => {
        queue.songs.shift();
        playSong(bot, msg, queue.songs[0]);
    });
    bot.queues.set(msg.member.guild.id, queue);
};

module.exports = {
    name: "play",
    help: "Reproduzir Música",
    category: "music",
    aliases: "p",
    usage: '[command]',
    execute,
    playSong,
};