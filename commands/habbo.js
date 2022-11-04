const request = require ('request')
const path = require ('path')
const { MessageAttachment } = require ('discord.js')
const MessageEmbed = require ("discord.js").MessageEmbed;
const fs = require('fs')
const fetch = require("node-fetch");

const execute = (bot, msg, args) => {
    console.log("> Comando [m!HABBO] inicializado!")
    
    const hotel = ['com.br', 'com', 'es'];
    let nick = (args[1]);
    
    var botName = "Mynth Bot - Habbo";
    var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";
    
    if (!args[0]) return msg.reply ('Por favor, indique um hotel [com.br/com/es]');
    
    // if (!hotel) return msg.reply ('Coloque um hotel válido (com.br/com/es)');
    
    if (!nick.toUpperCase) {
        return msg.reply ('Indique um nickname ')
    } else {
        
        request(`https://api.habboapi.net/habbos/${args[0]}/${nick}`, { 
        json: true 
    }, (err, res, habboIdUnique) => {
        
        if (err) { 
            return console.log(err)   
        }
        
        const habboId = habboIdUnique.habbo_id;
        console.log(habboId);
        
        // if (typeof habboid == "undefined") {
        //     const habboPrivate = new MessageEmbed()
        //     .setColor("0x0099ff")
        //     .setAuthor(botName, botAvatar)
        //     .setTitle (`Relatório | Request`) 
        //     .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/6f/Habbo-logo.png')
        //     .addField(`Não foi possível realizar a consulta.`, `O perfil é inexistente ou está privado!`, false)
        //     .addField(`\u200B\n`, `━━━━━━━━━━━━━━━━`, false)
        //     .addField(`Experimental`, `...`, false);

        //     msg.channel.send(habboPrivate)
        // } 
        
        fetch(`https://www.habbo.com/api/public/users/${habboId}/profile`)
        .then(response => response.json())
        .then(data => { 
            

            const name = data.user.name;
            const estrelas = data.user.starGemCount;
            const level = data.user.currentLevel;
            const perfil = `https://habbo.${args[0]}/profile/${name}`;
            const missaoRequest = data.user.motto;
            const id = data.user.uniqueId;
            const dataCriacao = data.user.memberSince.slice('0', '10');
            const ultimoLogin = data.user.lastAccessTime.slice('0', '10');
            
            const amigos = data.friends;
            
            if (!missaoRequest) {
                missao = "NULL";
            } else {
                missao = missaoRequest;
            }
            
            // for(var i = 0; i < amigos.length; i++){
            //     const amigos = amigos[i].name
            // }
            const habboDetails = new MessageEmbed()
            
            .setColor("0x0099ff")
            .setAuthor(botName, botAvatar)
            .setTitle (`Relatório | Request`) 
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/6f/Habbo-logo.png')
            
            .addField(`:diamond_shape_with_a_dot_inside: Nick:`, `${name}`, true)
            .addField(`:star: Stars:`, `${estrelas}`, true)
            .addField(`:diamond_shape_with_a_dot_inside: Level:`, `${level}`, true)
            
            .addField(`Perfil:`, `\`\`\`${perfil}\`\`\``, false)
            .addField(`Habbo-ID:`, `\`\`\`${id}\`\`\``, false)

            .addField(`Missão:`, `\`\`\`${missao}\`\`\``, false)
            .addField(`Data de Criação:`, `\`\`\`${dataCriacao}\`\`\``, false)
            .addField(`Último login:`, `\`\`\`${ultimoLogin}\`\`\``, false)
            
            .addField(`\u200B\n`, `━━━━━━━━━━━━━━━━━━━━━━━━━━━`, false)
            
            // .addField(`Experimental`, `${amigos}`, false);
            
            console.log(args);
            
            msg.channel.send(habboDetails);
            msg.channel.send(`${habboIdUnique.figure_medium}`);
            
        });
    });
}

}

module.exports = {
    name: "habbo",
    help: "Request do Habbo",
    execute,
}