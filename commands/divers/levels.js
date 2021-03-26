const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = class levelsXp extends Command {
    constructor(client) {
        super(client, {
            name: 'levels',
            memberName: 'levels',
            group: 'divers',
            description: 'xp levels',
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

    let sortCroi = (a,b) => a.xp-b.xp;
    resultArray.sort(sortCroi);
    resultArray.reverse();    
    
    const embed = new Discord.MessageEmbed();

    embed
       .setTitle('Xp Levels')
       .setColor('#3267AB')
       ;

    resultArray.forEach(element => {
        if (element.xp > 0) {
        let username = element.name;
        let xp = element.xp;
        let level = element.level;
        let id = element.id;

        embed
           .addField(username, xp + '  |  ' + level, true)
        }
    })

    msg.say(embed);

}
}
}