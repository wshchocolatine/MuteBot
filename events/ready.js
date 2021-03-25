const Discord = require('discord.js');

module.exports = {
    run: (client) => {
        console.log('info', `Bot identifié en tant que ${client.user.tag}! (${client.user.id})`);
    }
};