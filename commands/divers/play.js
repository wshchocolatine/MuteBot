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

        if (!audio.startsWith('http')) {
            let idVid;
            YouTube.searchOne(audio)
              .then(x => {
                  idVid = x.id
                  playAudio(`https://www.youtube.com/watch?v=${idVid}`)
              })
              .catch(error => console.log(error))
              ;
        }

        else {
            playAudio(audio);
        }

        function playAudio (audioPlayed) {
            let voiceChannel = msg.guild.channels.cache
            .filter(function(channel) {return channel.type === 'voice'})
            .first()
            voiceChannel
                .join().then(connection => {
                const stream = ytdl(audioPlayed, { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                
                dispatcher.on('finish', () =>  {
                    setTimeout( () => voiceChannel.leave(), 60000)
                });
            }) 
        }        
    }
}