const MessageEmbed = require ("discord.js").MessageEmbed;
const Discord = require('discord.js');
const { promptMessage } = require("./funcoes/functions.js");

var {commandsList} = require('./msgs');

var botName = "Mynth Bot - Comandos";
var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";

const opcoes = ["🛠", "❓", "🏅"]

const execute = async (bot, msg, args) => {
    
    const helpEmbed = new MessageEmbed()
    .setColor("0x0099ff")
    .setAuthor("Mynth Music - Comandos", `https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png`
    )
    .setThumbnail('https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png')
    .setDescription (`➥ Confira os comandos do **Mynth Bot** \n`)
    .addField('Reaja com o emoji correspondente: ', '\u200b')
    .addField('[:tools:] ● Configurações', '\`Configurações do Bot\`', true)
    .addField('[:question:] ● Comandos', '\`Comandos do Mynth\`', true)
    .addField('[:medal:]  ● Invite', '\`Convide o Mynth\`', true)
    
    // Imprimir o embed esperando as reações
    const m = await msg.channel.send (helpEmbed); 
    
    // Reagir a própria mensagem do bot com as opções
    const escolha = await promptMessage(m, msg.author, 30, opcoes);

    if (escolha === `🛠`){
        msg.reply("Configurações");
    } else if (escolha === `❓`) { 
        // 
        // 
        let string = "";
        bot.commands.forEach((command) => {
          if (command.help) {
            string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
          }
        })

        const commandsList = new MessageEmbed()
        .setColor("0x0099ff")
        .setAuthor(botName, botAvatar,)
        .setTitle ("➥ Comandos")
        .setDescription ("Clique no link para abrir a lista de comandos do **Mynth**: \n ● https://mynthbot.gg/info");
        await msg.channel.send(commandsList);
        // 
        // 
    } else if (escolha === '🏅') {
        const convite = new MessageEmbed()
        .setColor("0x0099ff")
        .setAuthor(botName, botAvatar,)
        .setTitle ("➥ Convide-o para o seu servidor!")
        .setDescription ("Clique abaixo e chame o **Mynth**: \n ● https://mynthbot.gg/invite :heartbeat: ");
        await msg.channel.send(convite);
    } else {
        msg.delete();
        return m.delete(15000)  
    }; 

    msg.delete();
    return m.delete();
};



module.exports = {
    name: "help",
    help: "Lista de Comandos",
    aliases: ['comandos', 'help'],
    usage: 'help',
    execute,
}