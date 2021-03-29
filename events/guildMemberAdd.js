const Discord = require('discord.js');
const fetch = require('node-fetch');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = {
    run: async (client, msg) => {
        if (msg.user.bot == false) {
            let hasRole = msg.guild.roles.cache.some(role => role.name == 'nouveau rôle') 

            if (hasRole) {
                let role = msg.guild.roles.cache.find(role => role.name == 'nouveau rôle')
                msg.roles.add(role); 
            }


            try {
                const client = new MongoClient(uri, { useUnifiedTopology: true });
                await client.connect();
                insertData(client);
            }

            catch (error) {
                console.log(error);
            }

            async function insertData (client) {
                let db = client.db('Discord');
                let col = db.collection(msg.guild.id);

                let userData = {
                    'name': msg.user.username,
                    'id': msg.user.id,
                    'xp': 0,
                    'level': 0,
                    'cooldown': false,
                }

                col.insertOne(userData);
            }
        }
    }
}