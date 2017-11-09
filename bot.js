const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;
const fetch = require('node-fetch');

// Write the Env variables on Heroku or your server, to keep them save from Github
var Bot = new TwitterBot({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

// Function that builds and tweets the message
function runBot() {
  fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
    .then(resp => resp.json())
    .then(text => text[0])
    .then(
      info => `Bitcoin Price: $${info.price_usd} [USD]
1hr - change: ${info.percent_change_1h > 0
        ? info.percent_change_1h + '% 📈'
        : info.percent_change_1h + '% 📉'}
1day - trend: ${info.percent_change_24h > 0
        ? info.percent_change_24h + '% 📈'
        : info.percent_change_24h + '% 📉'}
1week - trend: ${info.percent_change_7d > 0
        ? info.percent_change_7d + '% 📈'
        : info.percent_change_7d + '% 📉'}
Remaining Supply: ${(100 - info.total_supply / info.max_supply * 100).toFixed(
        3
      )}%`
    )
    .then(bitcoin => Bot.tweet(bitcoin))
    //.then(bitcoin => console.log(bitcoin)) // debugging purposes
    .catch(error => console.log('Error ', error));
}

// run Bot
runBot();
