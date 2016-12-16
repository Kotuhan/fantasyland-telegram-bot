const TeleBot = require('telebot');
const dropboxToken = require('../dropbox-token.js');
const telegramToken = require('../telegram-token.js');
const bot = new TeleBot(telegramToken);

const Dropbox = require('dropbox');
let dbx = new Dropbox({ accessToken: dropboxToken });
dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

bot.on('text', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});

bot.connect();
