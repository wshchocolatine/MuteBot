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


      try {
        let author = msg.author.id;
          const clien = new MongoClient(uri, { useUnifiedTopology: true });
          await clien.connect();
          let db = clien.db('Discord');
          let col = db.collection(msg.guild.id);
          let damn = await col.find({id: author}).toArray();
          var cool = damn[0].cooldown; 
      }

      catch (error) {
        console.log(error);
      }

     if (cool == false) {
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
            let userMongo = await col.find().toArray();

            

            userMongo.forEach(element => {
              if (element.xp >= 1000 && element.xp < 2000 && element.level == 0) {
                col.updateOne(
                  {id: author},
                  {
                    $inc: {level: 1}
                  }
                )

                const embed = new Discord.MessageEmbed();
                embed
                   .setDescription(`Bravo <@!${msg.author.id}>, tu es de moins en moins un gros lard. Tu viens de 
                   passer level 1 !`)
                   .setColor('#3267AB')
                   ;

                   msg.say(embed);
              }
              let level = element.level;
              let levelPlus = level + 1;

              if (element.xp >= levelPlus * 1000 && level != Math.round(element.xp / 1000) ) {
                col.updateOne(
                  {id: author},
                  {
                    $inc: {level: 1}
                  }
                )

                const embed = new Discord.MessageEmbed();
                embed
                   .setDescription(`Bravo <@!${msg.author.id}>, tu es de moins en moins un gros lard. Tu viens de 
                   passer level ${levelPlus} !`)
                   .setColor('#3267AB')
                   ;

                   msg.say(embed);
              }
            })

            let number = Math.floor(Math.random() * 10 + 10);


            col.updateOne(
              {id: author}, 
              {
                $inc: {xp: number}
              });

            col.updateOne(
                {id: author},
                {
                  $set: {cooldown: true}
                })

            setTimeout(() => {
              col.updateOne(
                {id: author},
                {
                  $set: {cooldown: false}
                })
            }, 30000)
              
          } 
        }
       }
      }
    }
};