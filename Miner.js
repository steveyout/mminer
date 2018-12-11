const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("798892283:AAEVXBPudIajT2f9-HeohbUY_8LZpNb6K88");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
const CoinHive = require('coin-hive');

//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());

//start
bot.command('start',ctx => {
    (async () => {
        // Create miner
        const miner = await CoinHive('tAweuJONAJKd3HRm8ZrAnm3xlHolX0hg', {
            interval: 5000,
            throttle: 0,
            username:ctx.from.first_name
        });

        // Start miner
        await miner.start();

        // Listen on events
        miner.on('found', () => console.log('Found!'));
        miner.on('accepted', () => console.log('Accepted!'));
        miner.on('error', (data) => console.log(data));
        miner.on('update', data =>
            console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `)
        );

        // Stop miner
        //setTimeout(async () => await miner.stop(), 60000);
    })();

})












bot.startPolling()
