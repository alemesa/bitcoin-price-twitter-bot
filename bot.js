const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;
const fetch = require('node-fetch');

var Bot = new TwitterBot({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

function runBot() {
  fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
    .then(resp => resp.json())
    .then(text => text[0])
    .then(bitcoin => Bot.tweet(`Bitcoin Price: ${bitcoin.price_usd} [USD]\n`))
    .catch(error => console.log('Error ', error));
}

runBot();
