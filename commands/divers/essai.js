const {Command} = require('discord.js-commando')
const Discord = require('discord.js');

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

    async run(message, {audio}) {
        let use = message.mentions.members.first();

        console.log(use.id)
        

        let status;
        switch (use.presence.status) {
            case "Online":
                status = ":online: Online";
                break;
            case "DND":
                status = ":dnd: DND";
                break;
            case "IDLE":
                status = ":idle: IDLE";
                break;
            case "OFFLINE":
                status = ":offline: Offline";
                break;
        }

        const userEmbed = new Discord.MessageEmbed()
            .setTitle(`Userinfos of ${use.user.username}`)
            .setColor('#e74c3c')
            .setThumbnail(use.user.displayAvatarURL())

        await message.channel.send(userEmbed)
    }
}