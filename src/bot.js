const TeleBot = require('telebot'),
  fs = require('fs'),
  dropboxToken = require('../dropbox-token.js'),
  telegramToken = require('../telegram-token.js'),
  bot = new TeleBot(telegramToken);

const Dropbox = require('dropbox');
let dbx = new Dropbox({ accessToken: dropboxToken });
dbx.sharingGetSharedLinkFile({url: 'https://www.dropbox.com/s/0ifzbgkcpnl1vic/file%20%285%29.png?dl=0'})
  .then(function(response) {
    let imagedata = response.fileBinary;
    const dir = './tmp';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    fs.writeFile(dir + '/photo.png', imagedata, 'binary', function(err){
      if (err) throw err
      console.log('File saved.')
    })
  })
  .catch(function(error) {
    console.log(error);
  });

let captcha;

fs.readFile('tmp/photo.png', function (err, data) {
  if (err) throw err;
  captcha = data;
});

bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});

bot.on(['/captcha', '/c'], msg => {
  let fromId = msg.from.id;
  let markup = bot.keyboard([
    ['0', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9']
  ], { resize: true });
  return bot.sendPhoto(fromId, captcha, { markup });
});

bot.connect();
