const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class meteoHlp extends Command {
    constructor(client) {
        super(client, {
            name: 'hlp_meteo',
            memberName: 'meteohlp',
            group: 'meteo',
            description: 'aide meteo',
            clientPermissions: ['SEND_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

    async run(msg) {
        const embed = new Discord.MessageEmbed();

        embed
           .setColor('#78BAF6')
           .setTitle('CONSEILS POUR LA METEO')
           .setAuthor('Meteo Man')

           .addField("Pas d'accents", 'ex: Samoëns -> Samoens', true)
           .addField("Espace comblés avec tirets", 'ex: Asnieres Sur Seine -> Asnieres-Sur-Seine', true)
           .addField("Rajouter son pays si l'on ne trouve pas sa ville", 'ex: Paris-Londres au Chili -> Paris-Londres Chili', true)

           ;

        msg.say(embed);
    }
};