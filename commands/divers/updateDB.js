const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = class setupdb extends Command {
    constructor (client) {
        super (client, {
            name: 'updtdb',
            memberName: 'updtdb',
            group: 'divers',
            ownerOnly: true,
            description: 'updtdb',
            clientPermissions: ['SEND_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

    async run (msg) {
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
            col.updateMany({}, {$set: {'level': 0}})
        }

        msg.say(`DataBase bien mise à jour pour  ${msg.guild.name}`);

    }
}