const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class roles extends Command {
    constructor(client) {
        super (client, {
            name: 'roles',
            memberName: 'roles',
            description: 'create roles for using mute command',
            group: 'divers',
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

   

    async run(msg) { 

        const hasRole = msg.guild.roles.cache.some(role => role.name === 'muter');

       if (!hasRole) {
        msg.guild.roles.create({
            data: {
                name: 'muter',
                color: '#ffffff',
            },
            reason: 'we needed a role for muting people',
        })
        .then()
        .catch(console.error)
        ;

        msg.guild.roles.create({
            data: {
                name: 'tag: unmute',
                color: '#02FF4A',
            },
            reason: 'If you are unmute',
        })
        .then()
        .catch(console.error)
        ;

        msg.guild.roles.create({
            data: {
                name: 'tag: mute',
                color: '#FF0000',
            }, 
            reason: 'If you are mute',
        })
        .then()
        .catch(console.error)
        ;

        const embed = new Discord.MessageEmbed();

        embed
           .setTitle('Roles bien ajoutés !')
           .setColor('#02FF4A')
           ;

        return msg.say(embed);
    }

    else {
        return msg.say('Vous avez déjà les roles !');
    }
    }
};