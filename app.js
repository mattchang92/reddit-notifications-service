const express = require('express');
const ses = require('node-ses');
const helpers = require('./helpers');
const config = require('./config.json');
const keys = require('./keys.json');

const client = ses.createClient({
  key: keys.SMTP_USERNAME,
  secret: keys.SMTP_PASSWORD,
});

const app = express();

app.get('*', (req, res, next) => {
  const auth = 'Basic ' + new Buffer(config.CLIENT_ID + ':' + config.CLIENT_SECRET).toString('base64');

  helpers.apiGet('https://www.reddit.com/r/gaming/new/.json?count=25');
  helpers.apiGet('https://www.reddit.com/r/kingdomhearts/new/.json?count=25');

  // client.sendEmail({
  //   to: 'matthewchang3150@gmail.com',
  //   from : 'matthewchang3150@hotmail.com',
  //   subject: 'test',
  //   message: 'hello world'
  // }, (err, data, res) => {
  //   if (err) console.log('error', err);
  //   console.log('data', data);
  // })
})
 
app.listen(4567, () => {
	console.log('Server listening on port 4567');
});