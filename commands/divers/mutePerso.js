const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class mute extends Command {
    constructor(client) {
        super(client, {
            name: 'pmute',
            memberName: 'pmute',
            group: 'divers',
            description: 'pmute le mute gang',
            ownerOnly: false,
            clientPermissions: ['MUTE_MEMBERS'],
            userPermissions: ['ADMINISTRATOR'],
            throttling: {
                usages: 1,
                duration: 1,
            },
            args: [
                {
                    key: 'local',
                    prompt: 'Vous souhaitez mute qui maître?',
                    type: 'string',
                },
            ],
        })
    }

    async run (msg, {local}) {

        const userName = local;

        var damn = msg.guild.members.cache.find(yeah => '<@!' + yeah.user.id +'>' === local); 
         damn.voice.kick();
         msg.delete();
    }
};