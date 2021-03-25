const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class roles extends Command {
    constructor(client) {
        super (client, {
            name: 'before',
            memberName: 'before',
            description: 'before muting',
            group: 'divers',
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

   

    async run(msg) {
        const muteRole = msg.guild.roles.cache.some(role => role.name ==='tag: mute');

        console.log(muteRole);

        if (muteRole) {
            await  msg.guilds.roles.cache.each(m => m.add(muteRole));

            return msg.say('Roles ajoutés');
        }
    }
};