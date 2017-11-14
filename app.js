const express = require('express');
const config = require('./config.json');
const fs = require('fs');
const CronJob = require('cron').CronJob;

const app = express();
const sendEmail = require('./helpers/emailClient');
const Parser = require('./helpers/dataParser');
const dataParser = new Parser(config);


new CronJob('0 7-23 * * * *', () => {
  const previousPosts = fs.readFileSync('logs/postsHistory.txt')
    .toString()
    .split('\n')
    .filter((id) => id);
  
  const redditPosts = dataParser.getMatchingResults();
  const newRedditPosts = redditPosts.filter((post) => !previousPosts.includes(post.id));
  
  sendEmail(newRedditPosts);
}, null, true, 'America/Los_Angeles');
 
app.listen(4567, () => {
	console.log('Server listening on port 4567');
});