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

fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
  .then(resp => resp.json())
  .then(resp => {
    twitterText = `Bitcoin Price: ${resp.price_usd} [USD]`;
  })
  .catch(error => console.log('Error ', error));

var phrase = twitterText + '\n';
Bot.tweet(phrase);
