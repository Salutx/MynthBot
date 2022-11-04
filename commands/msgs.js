const MessageEmbed = require ("discord.js").MessageEmbed;
const dotenv = require("dotenv");
dotenv.config();

// Variáveis;
// ============================
// ============================
// ============================

var botName = "Mynth Bot - Comandos";
var botAvatar = "https://cdn.discordapp.com/avatars/817155136135626752/bf09731f1f94902e87872dd7b9251369.png";
var botYoutube = "Mynth Music - Youtube";

// ============================
// Lista de comandos
// ============================

const commandsList = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(
    botName, 
    botAvatar,
)

.setTitle ("Comandos");

// ============================
// Não tem permissão!
// ============================

const noHavePermsisions = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)
.setTitle("Você não tem permissão! :closed_lock_with_key:")

// ============================
// Esse comando não existe
// ============================

const commandNotFound = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(botName, botAvatar)
.setTitle(`Esse comando não existe! :anguished:`)
.setDescription(`Veja a lista de comandos em: \`${process.env.PREFIX}help\` \n \n`);

// ============================
// Não há nenhuma música reproduzindo!
// ============================

const musicError = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(
    botYoutube, 
    botAvatar
)
.setTitle("Não há nenhuma música reproduzindo! :neutral_face:");

// ============================
// A música foi pausada com sucesso!
// ============================

const musicPaused = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(
    botYoutube, 
    botAvatar
)
.setTitle("A música foi pausada com sucesso! :white_check_mark:");

// ============================
// Sete o volume da música entre [0-10]!
// ============================

const musicVolume = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(
    botYoutube, 
    botAvatar
)
.setTitle("Sete o volume entre [0 - 10]!");

// ============================
// A música já está rolando 
// ============================

const musicNotPaused = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(
    botYoutube, 
    botAvatar
)
.setTitle("A música está já está rolando...");

// ============================
// musicResumed
// ============================

const musicResumed = new MessageEmbed()
.setColor("0x0099ff")
.setAuthor(
    botYoutube, 
    botAvatar
)
.setTitle("A música voltou a tocar! :musical_note:");

module.exports = {musicError, musicPaused, musicVolume, musicNotPaused, musicResumed, commandNotFound, commandsList, noHavePermsisions};