const fs = require('fs');
const ses = require('node-ses');
const keys = require('../keys.json');

const client = ses.createClient({
  key: keys.SMTP_USERNAME,
  secret: keys.SMTP_PASSWORD,
});

const buildMessage = (post) => {
  return (
    `<div>
      <h3>${post.title}</h3>
      <a href='https://www.reddit.com${post.link}'>Click here for link</a>
    </div>
    <hr>
    `
  )
};

const buildEmailBody = (data) => (
  data.reduce((acc, post) => {
    return acc.concat(buildMessage(post));
  }, '')
);

const logAllPostsSent = (data) => {
  data.forEach((post) => {
    fs.appendFileSync('logs/postsHistory.txt', `${post.id}\n`);
  })
}

const logErrors = (error) => {
  fs.appendFileSync('logs/errors.txt', `${error}\n----------------------------------------------------------------\n`);
}

const sendEmail = (data) => {
  return client.sendEmail({
    to: keys.TO_EMAIL,
    from : keys.FROM_EMAIL,
    subject: 'New Reddit Posts',
    message: buildEmailBody(data),
  }, (err, result, res) => {
    if (!err) {
      logAllPostsSent(data);
    } else {
      logErrors(err);
    }
  })
};

module.exports = sendEmail;