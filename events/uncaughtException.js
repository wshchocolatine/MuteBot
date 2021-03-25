module.exports = {
    run: (client, error) => {
        if (!error) return;

        console.log('error', error.stack ? error.stack : error.toString());
    }
};