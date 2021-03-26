const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const ytdl = require('ytdl-core');

module.exports = class playAudio extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfw',
            memberName: 'nsfw',
            group: 'divers',
            ownerOnly: true,
            description: 'add role nsfw audio',
            args: [
                {
                    key: 'mec',
                    prompt: 'Dis les termes',
                    type: 'string',
                },
            ],
        });
    }

    async run(msg, {mec}) {
        var role = msg.guild.roles.cache.find(role => role.name == 'nsfw');
        var roleBis = msg.guild.roles.cache.find(role => role.name =='new role');
        var user = msg.guild.members.cache.find(user => '<@!' + user.user.id + '>' === mec);
        
        user.roles.add(role);

        msg.delete();
    }

}