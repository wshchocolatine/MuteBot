const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class alice extends Command {
    constructor (client) {
        super (client, {
            name: 'alice',
            memberName: 'alice',
            group: 'divers',
            description: 'answers with a bovin',
            ownerOnly: false,
            thorttling: {
                usages: 1,
                duration: 1,
            },
            clientPermissions: ['SEND_MESSAGES'],
        })
    }

    async run (msg){
        const embed = new Discord.MessageEmbed();

        embed
          .setTitle('ALICE :')
          .setImage('https://upload.wikimedia.org/wikipedia/commons/4/40/Anneau_anti_tetee_P1190486.jpg')
        ;

        msg.say(embed);
    }
};