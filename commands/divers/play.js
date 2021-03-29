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

        let member = msg.guild.members.cache.find(mem => mem.id == msg.author.id);

        if (member.voice.channel) {

            if (!audio.startsWith('http')) {
                let idVid;
                let titleVid;
                YouTube.searchOne(audio)
                  .then(x => {
                      idVid = x.id
                      titleVid = x.title
                      playAudio(`https://www.youtube.com/watch?v=${idVid}`, titleVid, `https://www.youtube.com/watch?v=${idVid}`)
                  })
                  .catch(error => console.log(error))
                  ;
            }
    
            else {
                playAudio(audio);
            }
    
            function playAudio (audioPlayed, video, linkVideo) {
                let idChannel = member.voice.channelID;
                let voiceChannel = msg.guild.channels.cache.find(chan => chan.id == idChannel);

                voiceChannel
                    .join().then(connection => {
                    const stream = ytdl(audioPlayed, { filter: 'audioonly' });
                    const dispatcher = connection.play(stream);

                    let embed = new Discord.MessageEmbed();
                    
                    embed.setTitle('Now Playing :')
                         .setDescription([video] (linkVideo))
                         .setColor('#3267AB')

                    msg.say(embed);

                    dispatcher.on('finish', () =>  {
                        setTimeout( () => voiceChannel.leave(), 60000)
                    });
                }) 
            }     
        }   
    }
}