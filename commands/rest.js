const MessageEmbed = require ("discord.js").MessageEmbed;

var botName = "Mynth Bot - Comandos";
var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";

const execute = (bot, msg, args) => {
    const embed = new MessageEmbed()
    .setColor("0x0099ff")
    .setAuthor(botName, botAvatar)
    .setTitle ("➥ Funções e comandos que faltam:")
    .addField ("`m!queue`", "Listagem das músicas", true);

    msg.send(embed).then (message => message.delete({ timeout: 20000 }));

}   

module.exports = {
name: "rest",
execute,
};