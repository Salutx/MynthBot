const Discord = require('discord.js');
const ytlist = require('youtube-playlist');
const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';

const execute = (bot, msg, args) => {
    ytlist(url, 'name').then(res => {
        console.log(res);
    }
);
}

module.exports = {
    name: "playlist",
    help: "Coloque sua playlist",
    execute,
}