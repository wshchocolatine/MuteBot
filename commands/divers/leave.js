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

        let member = msg.guild.members.cache.find(mem => mem.id == '798651641909739550');

        if (member.voice.channel) {
            let idChannel = member.voice.channelID;
            let voiceChannel = msg.guild.channels.cache.find(chan => chan.id == idChannel);
    
            voiceChannel.leave();
        }
    }

}