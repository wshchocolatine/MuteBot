const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');

let resultat;

module.exports = class yesNoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yesno',
            memberName: 'yesorno',
            group: 'divers',
            description: 'respond yes or no',
            clientPermissions: ['SEND_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 1,
            },
        })
    }

    async run(msg) {

        fetch ('https://yesno.wtf/api')
          .then((reponse) => {
              return reponse.json();
          })
          .then((data) => {

              resultat = data.answer;

              msg.say(resultat);
          });
    }
};