const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const ytdl = require('ytdl-core');

module.exports = class playAudio extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            memberName: 'play',
            group: 'divers',
            description: 'play audio',
            args: [
                {
                    key: 'audio',
                    prompt: 'Dis les termes',
                    type: 'string',
                },
            ],
        });
    }

    async run(msg, {audio}) {
        let voiceChannel = msg.guild.channels.cache
        .filter(function(channel) {return channel.type === 'voice'})
        .first()
        voiceChannel
            .join().then(connection => {
            const stream = ytdl(audio, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            
            dispatcher.on('finish', () => voiceChannel.leave());
        }) 
        
    }
}