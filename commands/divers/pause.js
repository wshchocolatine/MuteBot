const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const ytdl = require('ytdl-core');
const YouTube = require("youtube-sr").default;

module.exports = class playAudio extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            memberName: 'pause',
            group: 'divers',
            description: 'pause audio',
        });
    }

    async run (msg) {
        console.log(msg.guild.presences.cache.array());
        console.log(msg.guild.channels.cache.array());
        msg.delete();
    }

}
