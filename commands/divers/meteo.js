const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const fetch = require('node-fetch');

console.log('Hello World');

module.exports = class meteoCommand extends Command{
    constructor(client) {
        super (client, {
            name: 'meteo',
            memberName: 'meteo',
            group: 'meteo',
            description: 'gives meteo', 
            clientPermissions: ['SEND_MESSAGES'],
            throttling: {
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

    async run(msg, { local }) {



let temp;
let description;
let clouds;

let localisation = local;
let lat;
let lng;

let nuages;
let soleil;
let neige;
let pluie;

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

          temp = datab.current.temp;
          description = datab.current.weather[0].description;
          clouds = datab.current.clouds;


          nuages = description.search('nuageux', 'couvert');
          soleil = description.search('dégagé');
          neige = description.search('neige');
          pluie = description.search('pluie');

          const embed = new Discord.MessageEmbed();

          embed
            .setColor(`#78BAF6`)
            .setTitle(`Voici la météo pour ${localisation}`)
            .setAuthor('Meteo Man')

            .setFooter('Merci Meteo Man !')

            .addField('Degrés', `${temp}`, true)
            .addField('Description', `${description}`, true)
            .addField('Nuages', `${clouds}`, true)
            ;

        if (nuages != -1)
        {
            embed 
              .setImage('https://static.actu.fr/uploads/2020/01/nuages.jpg')
            ;
        }

        else if (soleil != -1)
        {
            embed
              .setImage('https://t1.ldh.be/yIFe_v7sMAsUZ2O_v6IBfhNFTPA=/0x0:2560x1280/1920x960/5e785749d8ad582f31e73e09.jpg')
            ;
        }

        else if (neige != -1)
        {
            embed
              .setImage('https://ekladata.com/OJ7d5ZtSdOIkUkw_kjj8S4YKltg.png')
            ;
        }

        else if (pluie != -1)
        {
            embed
              .setImage('https://cdn.futura-sciences.com/buildsv6/images/wide1920/e/3/7/e374c1d3ee_118026_odeur-pluie.jpg')
            ;
        }

          msg.say(embed);

      })
      .catch((err) => {
          console.log(err);
      });
};


};
};