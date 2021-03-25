const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = class setupdb extends Command {
    constructor (client) {
        super (client, {
            name: 'setupdb',
            memberName: 'setupdb',
            group: 'divers',
            ownerOnly: true,
            description: 'setupdb',
            clientPermissions: ['SEND_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

    async run(msg){

        async function insertData (client) {
            let db = client.db('Discord');
            db.createCollection(msg.guild.id);
            let col = db.collection(msg.guild.id);


            await msg.guild.members.fetch().then( (members) => {
                let user = members.map(user => user.user);

                user.forEach(element => {
                    let userData = {
                        'name': element.username,
                        'id': element.id,
                        'xp': 0
                    }

                    col.insertOne(userData);
                })
            })
        }

        try {
            const client = new MongoClient(uri, { useUnifiedTopology: true });
            await client.connect();
            insertData(client);      

        }

        catch (error) {
            console.log(error);
        }

        msg.say('Mission bien executée chef ! DataBase lancée pour ce serveur !')

    }
};