const Discord = require ('discord.js');
const dotenv = require("dotenv");
const fs = require("fs");
const path = require ("path");

dotenv.config();

var {commandNotFound} = require('./commands/msgs.js');



const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
bot.commands = new Discord.Collection();
bot.queues = new Map();

const commandFiles = fs
.readdirSync(path.join(__dirname,"/commands"))
.filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}

bot.login(process.env.TOKEN);

bot.on('ready', function () {
    console.log(`Alright! ${bot.user.username} connected.`)
    bot.user.setPresence({
        status: 'dnd',
        activity: {
            name: `${process.env.STATUS}`,
            type: 3,
        }
    })
});

bot.on('message', (msg) => {
    if(!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
    
    msg.content.toLowerCase;
    
    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();

    try {
        bot.commands.get(command).execute(bot, msg, args); 
    } catch (e) {
        return msg.reply(commandNotFound).then (message => message.delete({ timeout: 20000 }));
    }
});



