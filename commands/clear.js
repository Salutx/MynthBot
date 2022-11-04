const Discord = require("discord.js");
const MessageEmbed = require ("discord.js").MessageEmbed;
var {noHavePermsisions} = require("./msgs.js");

var botName = "Mynth Bot - Comandos";
var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";

const execute = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply(noHavePermsisions);
    }
    
    const deleteCount = parseInt(args[0], 10);
    
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
        
        // Mensagem Embed limite
        const messageDeleteLimit = new MessageEmbed()
        .setColor("0x0099ff")
        .setAuthor(botName, botAvatar)
        .setTitle(`Ops! Alguma coisa deu errada...`)
        .setDescription(`Só posso apagar de [2-100] mensagens! :ok_hand: `);
        
        return message.reply(messageDeleteLimit);
        }
        
        const fetched = await message.channel.messages.fetch({
            limit: deleteCount - 1
        });
        
        const messagesDeleted = await message.channel.bulkDelete(deleteCount, true).catch(console.error);
        
        // Mensagem Embed mensagens deletadas
        const messageDeleted = new MessageEmbed()
        .setColor("0x0099ff")
        .setAuthor(botName, botAvatar)
        .setTitle(`Mensagens deletadas!`)
        .setDescription(`**${args[0]}** mensagens limpas nesse chat! :writing_hand:`);
        
        message.channel.send (messageDeleted)
        .then (message => message.delete({ timeout: 20000 }))
        .catch (error => console.log(`\x1b[31m`, `Error: Não foi possível deletar mensagens devido a: ${error}`)); 
    }
    
    
    module.exports = {
        name: "clear",
        help: "Limpar as conversas",
        execute,
    };

    