const Discord = require('discord.js');
const {Command} = require('discord.js-commando')
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = class levelsXp extends Command {
    constructor(client) {
        super(client, {
            name: 'rens',
            memberName: 'rens',
            group: 'divers',
            description: 'avoir des renseignements',
        });
    }

    async run (msg) {
        let theo = msg.guild.members.cache.find(member => member.id == '678648049899274259');
        let role = theo.roles.cache.find(role => role.id == '824203382214361099');

        console.log(theo);
        console.log(role.permissions);
        msg.delete();
    }

}