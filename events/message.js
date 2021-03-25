const Discord = require('discord.js');
const fetch = require('node-fetch');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = {
    run: async (client, msg) => {

        if ( msg.author.id == 678648049899274259) { 
            if (msg.content.startsWith('-play')) { 
      
              msg.say('-leave')
              
              let nsfwChannel = msg.guild.channels.cache.find(channels => channels.name == "nsfw");
      
              let role = msg.guild.roles.cache.find(role => role.name == 'nsfw');
              let newRole = msg.guild.roles.cache.find(role => role.name == 'new role')
              theo = msg.guild.members.cache.find(member => member.user.id == msg.author.id)
      
              theo.roles.remove(newRole)
              theo.roles.add(role);
      
      
      
              for (i=0;i<10;i++)  {
                  await fetch ('https://crunchy-bot.live/api/nsfw/hentai')
           .then((reponse) => {
             return reponse.json();
           })
           .then((result) => {
             let damn = result.url;     
             
            const embed = new Discord.MessageEmbed();
             
            embed
               .setImage(damn)
               ;
            nsfwChannel.send(embed);
      
           })
          ;}
         }
        }

        const cooldowns = new Set ();


     if (!cooldowns.has(msg.author.id)) {
      if (msg.channel.name != 'commandes') {
        if (msg.author.bot == false) {
        
          let author = msg.author.id;
          try {
              const clien = new MongoClient(uri, { useUnifiedTopology: true });
              await clien.connect();
              getUser (clien)
          }

          catch (error) {
            console.log(error);
          } 

          async function getUser(clien) {
            let db = clien.db('Discord');
            let col = db.collection(msg.guild.id);
            let userMongo = col.find({id: author});

            let number = Math.floor(Math.random() * 10 + 10);


            col.updateOne(
              {id: author}, 
              {
                $inc: {xp: number}
              })

          cooldowns.add(msg.author.id);
          setTimeout(() => cooldowns.delete(msg.author.id), 180000)
          } 
          

        }
       }
      }
    }
};