const request = require('request');
const config = require('../config.json');

const apiGet = (endpoint) => (
  new Promise((resolve, reject) => {
    request(endpoint, (err, response, body) => {
      const content = JSON.parse(body).data.children.reduce((acc, post) => {
        return [
          ...acc,
          {
            title: post.data.title,
            id: post.data.id,
            link: post.data.permalink,
          }
        ];
      }, []);

      if (!err) {
        resolve(content);
      } else {
        reject(err);
      }
    })
  })
);

module.exports = {
	apiGet,
};
