const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const ytdl = require('ytdl-core');

module.exports = class leaveChannel extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            memberName: 'leave',
            group: 'divers',
            description: 'play audio',
        });
    }

    async run (msg) {
        console.log(msg);
        let voiceChannel = msg.guild.channels.cache
        .filter(function(channel) {return channel.type === 'voice'})
        .first()

        voiceChannel.leave();
    }

}