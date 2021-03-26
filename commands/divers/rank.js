const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = class rankXp extends Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            memberName: 'rank',
            group: 'divers',
            description: 'xp rank',
        });
    }

    async run (msg) {
        getConnect();

        async function getConnect () {
            try {
                const clien = new MongoClient(uri, { useUnifiedTopology: true });
                await clien.connect();
                getUser (clien)
            }
        
            catch (error) {
              console.log(error);
            } 
        }
        
        async function getUser (clien) {
            let db = clien.db('Discord');
            let col = db.collection(msg.guild.id);
        
            let result = await col.find().toArray();
            let resultArray = [];
        
        
            result.forEach(element => resultArray.push(element))

            let yo = resultArray.find(element => element.id == msg.author.id);
            const embed = new Discord.MessageEmbed();

            embed
               .setColor('#3267AB')
               .setDescription(`<@!${msg.author.id}>` + '\n\n**Xp**       ' + yo.xp + '\n     **Level**      ' + yo.level)
               ;

            msg.say(embed);
        }   
    }

}