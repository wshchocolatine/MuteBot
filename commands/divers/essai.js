const {Command} = require('discord.js-commando')

module.exports = class playAudio extends Command {
    constructor(client) {
        super(client, {
            name: 'essai',
            memberName: 'essai',
            group: 'divers',
            description: 'essai',
            args: [
                {
                    key: 'audio',
                    prompt: 'What music do you wanna play?',
                    type: 'string',
                },
            ],
        });
    }

    async run(msg, {audio}) {
        console.log(msg);
    }
}