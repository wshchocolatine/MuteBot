const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

yeah ();

async function yeah () {
    try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const cursor = client.db('Essai').collection('Allez').find();
    const result = await cursor.toArray();
    console.log(result);

    let db = client.db('Discord');
    let col = db.collection('Xp');

    col.insertOne({ item: "card", qty: 15 });
    }

    catch (error){
        console.log(error);
    }
} 

