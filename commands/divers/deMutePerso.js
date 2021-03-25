const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class mute extends Command {
    constructor(client) {
        super(client, {
            name: 'pdemute',
            memberName: 'pdemute',
            group: 'divers',
            description: 'pdemute le mute gang',
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
                    prompt: 'Vous souhaitez demute qui maître?',
                    type: 'string',
                },
            ],
        })
    }

    async run (msg, {local}) {

        const userName = local;

         var damn = msg.guild.members.cache.find(yeah => '<@!' + yeah.user.id +'>' === local); 
         damn.voice.setMute(false); 
        

    }
};