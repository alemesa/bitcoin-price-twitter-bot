const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;
const fetch = require('node-fetch');

var Bot = new TwitterBot({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

let twitterText;

function getBitcoinData() {
  return fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/').then(resp =>
    resp.json()
  );
}

function getPromiseData() {
  return Promise.all([getBitcoinData]);
}

getPromiseData().then(data => {
  let twitterText = `Bitcoin Price: ${resp.price_usd} [USD]\n`;
  Bot.tweet(twitterText);
});
