const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const client = new CommandoClient({
    commandPrefix: '.',
    owner:  '667375094569369633',
    disableMentions: 'everyone',
    presence: {
        activity: {
            name: '@MuteBot',
            type: 'WATCHING'
        }
    }
});

client.registry
        .registerDefaultTypes()
        .registerGroups([['meteo', 'Meteos'], ['divers', 'Divers']])
        .registerCommandsIn(path.join(__dirname, 'commands'))
;

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
      const eventFunction = require(`./events/${file}`);
      if (eventFunction.disabled) return;

      const event = eventFunction.event || file.split('.')[0];
      const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
      const { once } = eventFunction;

      try {
          emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
      } catch (error) {
          console.error(error.stack);
      }
  });
})

client.once('ready', () => {
    console.log(`Je suis prêt !`);
    //client.channels.cache.find(channel => channel.name === 'commandes').send("Je suis en ligne !");
});


client.on('error', console.error); 


client.login('Nzk4NjUxNjQxOTA5NzM5NTUw.X_4ITQ.AbTQqFSQJUh07eQQ9VLCU3gJe-c');


