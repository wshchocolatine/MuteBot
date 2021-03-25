const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Hallo extends Command {
    constructor (client) {
        super (client, {
            name: 'hallo',
            memberName: 'hallo',
            group: 'divers',
            description: 'answer with hallo',
            clientPermissions: ['SEND_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

    async run(msg){
        msg.say('Hallo');
    }
};