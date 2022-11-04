const Discord = ("discord.js");
const MessageEmbed = require ("discord.js").MessageEmbed;

var {errorBan, botNotHavePermissions, especifyUserBan, userNotfound, upCargo} = require('./banMsgs.js');
var {noHavePermsisions} = require('./msgs.js')

var botName = "Mynth Bot - Comandos";
var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";

const execute = async (client, message, args) => {
    
    if(!message.member.hasPermission("BAN_MEMBERS")) 
    return message.channel.send(noHavePermsisions)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) 
    return message.channel.send(botNotHavePermissions)
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    if(!args[0]) 
    return message.channel.send(especifyUserBan);
    
    if(!member) 
    return message.channel.send(userNotfound);
    
    if(!member.bannable) 
    return message.channel.send(upCargo);
    
    if(member.id === message.author.id) 
    return message.channel.send('Bruh, you can\'t ban yourself!');
    
    let reason = args.slice(1).join(" ");
    
    if(!reason) reason = 'Motivo não especificado!';
    
    member.ban({reason: `${reason}`}).catch(err => { 
        message.channel.send(errorBan)
        console.log(err)
    })
    
    const playerBanned = new MessageEmbed()
    .setColor("0x0099ff")
    .setAuthor(
        botName, 
        botAvatar,
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle (`Um usuário acaba de ser punido!`)
        .setDescription(`O usuário em questão foi banido! :woman_detective: \n \n **Usuário punido: ** \n ${member} \n \n **Punido por: ** \n ${message.author} \n \n **Motivo:** \n ${reason}`)
        .setTimestamp();
        message.channel.send(playerBanned);
        
}

module.exports = {
    name: "ban",
    help: "Banir pessoas",
    execute,
}