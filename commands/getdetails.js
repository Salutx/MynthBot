const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js').MessageEmbed;
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Parceiro de Investimento',
	DISCORD_PARTNER: 'Parceiro do Discord',
	BUGHUNTER_LEVEL_1: 'Caçador de Bug (Level 1)',
	BUGHUNTER_LEVEL_2: 'Caçador de Bug (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Suporte',
	TEAM_USER: 'Team User',
	SYSTEM: 'Sistema',
	VERIFIED_BOT: 'Bot Verificado',
	VERIFIED_DEVELOPER: 'Desenvolvedor de Bot\'s verificado'
};

const execute = async (message, target) => {
    const member = message.mentions.member.last() || message.guild.member.cache.get(target) || message.member;
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
    const userFlags = member.user.flags.toArray();
    const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(member.displayHexColor || 'BLUE')
        .addField('User', [
            `**❯ Username:** ${member.user.username}`,
            `**❯ Discriminator:** ${member.user.discriminator}`,
            `**❯ ID:** ${member.id}`,
            `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
            `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
            `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
            `**❯ Status:** ${member.user.presence.status}`,
            `**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
            `\u200b`
        ])
        .addField('Member', [
            `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
            `**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
            `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
            `**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
            `\u200b`
        ]);
    return message.channel.send(embed);
}

module.exports = {
    name: "getdetails",
    help: "Pegue informações do Discord sobre um usuário",
    execute,
}