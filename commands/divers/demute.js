const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class mute extends Command {
    constructor(client) {
        super(client, {
            name: 'demute',
            memberName: 'demute',
            group: 'divers',
            description: 'demute le mute gang',
            ownerOnly: false,
            clientPermissions: ['MUTE_MEMBERS'],
            userPermissions: ['ADMINISTRATOR'],
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

    async run (msg) {

                msg.member.voice.channel.members.forEach(async m => {
                   await  m.voice.setMute(false)
                })

    }
};