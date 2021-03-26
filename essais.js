const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";
const YouTube = require("youtube-sr").default;

getConnect();

YouTube.searchOne('Indila Last Dance')
        .then(x => console.log(x.id))
        .catch(error => console.log(error))
        ;
async function getConnect () {
    try {
        const clien = new MongoClient(uri, { useUnifiedTopology: true });
        await clien.connect();
        getUser (clien)
    }

    catch (error) {
      console.log(error);
    } 
}

async function getUser (clien) {
    let db = clien.db('Discord');
    let col = db.collection('666340373513240596');

    let result = await col.find().toArray();
    let resultArray = [];


    result.forEach(element => resultArray.push(element))

    let sortCroi = (a,b) => a.xp-b.xp;
    resultArray.sort(sortCroi);
    resultArray.reverse();

    for (i=0; i<resultArray.length; i++) {
        var username = resultArray[i].name;
        var xp = resultArray[i].xp;
        var id = resultArray[i].id;
    }

}

let yo = 2;
let no = 1;


