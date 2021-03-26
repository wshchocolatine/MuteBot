const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const ytdl = require('ytdl-core');
const YouTube = require("youtube-sr").default;

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

        let audioPlay;

        if (!audio.startsWith('http')) {
            let idVid;
            YouTube.searchOne('Indila Last Dance')
              .then(x => {
                  idVid = x.id
              })
              .catch(error => console.log(error))
              ;
            
            audioPlay = `https://www.youtube.com/watch?v=${idVid}`
        }

        else {
            audioPlay = audio;
        }

        let voiceChannel = msg.guild.channels.cache
        .filter(function(channel) {return channel.type === 'voice'})
        .first()
        voiceChannel
            .join().then(connection => {
            const stream = ytdl(audioPlay, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            
            dispatcher.on('finish', () =>  {
                setTimeout( () => voiceChannel.leave(), 60000)
            });
        }) 
        
    }
}