const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class amongUs extends Command {
    constructor(client) {
        super(client, {
            name: 'amongus',
            memberName: 'amongus',
            description: 'create an message for presenting the among us servor',
            group: 'divers',
            throttling: {
                usages: 1,
                duration: 1,
            }, 
            ownerOnly: true,
        })
    }
    async run(msg) {
        const embed = new Discord.MessageEmbed();

        embed
           .setColor('#FF1B01')
           .setTitle('Bienvenue')
           .setImage('https://images.frandroid.com/wp-content/uploads/2020/12/among-us.jpg')
           .setAuthor('Serveur Among Us')
           .addField('Rejoignez une partie dans \'Vocal\'', 'Allez dans le salon vocal nommé \'vocal\' pour parler avec nous')
           .addField('Parlez dans \'Général\'', 'Si vous n\'avez pas de micro parlez dans le salon textuel nommé \'général\'')


           ;

           msg.say(embed);
    }
};