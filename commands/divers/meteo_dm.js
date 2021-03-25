const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class meteoDm extends Command {
    constructor(client) {
        super (client, {
            name: 'meteo_dm',
            memberName: 'meteo_dm',
            group: 'meteo',
            description: 'gives the meteo of tommorow',
            clientPermissions: ['SEND_MESSAGES'],
            thorttling: {
                usages: 1,
                duration: 1,
            },
            args: [
                {
                    key: 'local',
                    prompt: 'Vous souhaitez la météo de quelle ville?',
                    type: 'string',
                },
            ],
        })
    }

    async run(msg, {local}) {

let temp;
let description;
let localisation = local;
let lat;
let lng;
let max;
let min;

appelApi(localisation);



const apiKey = '893c4f7337c2ecd01bafe5422e82f217';

function appelApi(localisation) {

    
    //console.log(local);

    let urlApi = `https://api.opencagedata.com/geocode/v1/json?q=${localisation}&key=d4f4b80ea27a42f4bdd97339b9820ca0&language=fr&pretty=1`;

    fetch(urlApi)
       .then((reponse) => {
           return reponse.json();
       })
       .then((data) => {

           lat = data.results[0].geometry.lat;
           lng = data.results[0].geometry.lng;

           appelApiBis(lat, lng);
       })
       .catch((err) => {
           console.log(err);
       });

}
        
function appelApiBis(lat, lng) {
    fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=metric&lang=fr&appid=893c4f7337c2ecd01bafe5422e82f217`)
      .then((reponse) => {
          return reponse.json();
      })
      .then((datab) => {

          temp = datab.daily[1].temp.day;
          max = datab.daily[1].temp.max;
          min = datab.daily[1].temp.min;
          description = datab.daily[1].weather[0].description;

          const embed = new Discord.MessageEmbed();

          embed
            .setColor(`#78BAF6`)
            .setTitle(`Voici la météo pour **${localisation}** demain`)
            .setAuthor('Meteo Man')

            .setFooter('Merci Meteo Man !')

            .setThumbnail('https://images.rtl.fr/rtl/www/1219869-catherine-laborde-presentatrice-de-meteo-sur-tf1.jpg')

            .addField('Moyenne', `${temp}`, true)
            .addField('Max', `${max}`, true)
            .addField('Min', `${min}`, true)
            .addField('Description', `${description}`, true)
            ;

          msg.say(embed);
      })
      .catch((err) => {
          console.log(err);
      });
};

    }
};