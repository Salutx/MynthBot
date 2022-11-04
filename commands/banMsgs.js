const Discord = ("discord.js");
const MessageEmbed = require ("discord.js").MessageEmbed;
const dotenv = require("dotenv");

dotenv.config();

var botName = "Mynth Bot - Comandos";
var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";

// ============================
// Erro
// ============================

const errorBan = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)

.setTitle ("Ops! Há algo de errado.")
.setDescription("Não foi possível aplicar a punição. :worried: ")
.addField('Possível erro: ', 'falta de razão')
.setFooter(`- Comando: ${process.env.PREFIX}ban [user] [razão]`, '');

// ============================
// Eu não tenho permissão para isso.
// ============================

const botNotHavePermissions = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)

.setTitle ("Ops! Há algo de errado.")
.setDescription(`Eu não tenho permissão para isso! :sneezing_face: \n \n **Como consertar:** \n - Atribua as permissões; \n \n **Como usar:** \n - \`${process.env.PREFIX}ban [@user] [razão]\``)

// ============================
// Usuário não especificado
// ============================

const especifyUserBan = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)

.setTitle ("Ops! Há algo de errado.")
.setDescription(`Especifique um usuário! :blond_haired_person: \n \n **Como usar:** \n - \`${process.env.PREFIX}ban [@user] [razão]\``)

// ============================
// Não consegui encontrar...
// ============================

const userNotfound = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)

.setTitle ("Ops! Há algo de errado.")
.setDescription(`Desculpe! Não consegui encontrar o usuário. :sob: \n \n **Como usar:** \n - \`${process.env.PREFIX}ban [@user] [razão]\``)

// ============================
// Não consegui encontrar...
// ============================

const upCargo = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)

.setTitle ("Ops! Há algo de errado.")
.setDescription(`O usuário está acima de mim. :sob: \n \n **Como consertar:** \n`)
.setImage('https://i.imgur.com/JkJfjMV.png')

module.exports = {errorBan, botNotHavePermissions, especifyUserBan, userNotfound, upCargo};


