const {Command} = require('discord.js-commando')

module.exports = class playAudio extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            memberName: 'delete',
            group: 'divers',
            description: 'delete last messages',
            args: [
                {
                key: 'nameChannel',
                prompt: 'What channel do you want to delete?',
                type: 'string',
            },
        ],
        });
    }

    async run(msg, {nameChannel}) {

        console.log(nameChannel);
        var yeah = msg.guild.channels.cache.find(channel => channel.name == nameChannel);
        yeah.messages.delete();
}
}