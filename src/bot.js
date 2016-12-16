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

bot.on('/start', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});

bot.on(['/captcha', '/c'], msg => {
  let img = 'http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/724x5000/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg'
  return bot.sendPhoto(msg.from.id, binary);
});

bot.connect();
