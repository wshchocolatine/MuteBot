const Discord = require('discord.js');
const fetch = require('node-fetch');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yeah:bsCXIITlA8Ssg9gH@cluster0.1eymt.mongodb.net/Discord?retryWrites=true&w=majority";

module.exports = {
    run: async (client, oldState, newState) => {

        try {
            let author = newState.id;
            const clien = new MongoClient(uri, { useUnifiedTopology: true });
            await clien.connect();
            let db = clien.db('Discord');
            let col = db.collection(newState.guild.id);
            let damn = await col.find({id: author}).toArray();
            var cool = damn[0].connected; 
          }
    
        catch (error) {
            console.log(error);
          }
        
        let total;
        let intervall;

        if (!cool) {

            if (newState.channelID != null) {
                try {
                    let clien = new MongoClient(uri, {useUnifiedTopology: true})
                    await clien.connect();

                    someoneConnected (clien)
                }

                catch (error) {
                    console.log(error);
                }

                async function someoneConnected (clien) {
                    let db = clien.db('Discord');
                    let col = db.collection(newState.guild.id);
                    let author = newState.id;

                    col.updateOne(
                        {id: author},
                        {
                            $set: {connected: true}
                        }
                    )
            }

                console.log('Connecté !')
            }
        }


        if (newState.channelID == null) {

            try {
                let clien = new MongoClient(uri, {useUnifiedTopology: true})
                await clien.connect();

                someoneDisconnected (clien)
            }

            catch (error) {
                console.log(error);
            }

            async function someoneDisconnected (clien) {
                let db = clien.db('Discord');
                let col = db.collection(newState.guild.id);
                let author = newState.id;

                col.updateOne(
                    {id: author},
                    {
                        $set: {connected: false}
                    }
                )

                console.log('Deconnecté !')
            }
        }
    }
}