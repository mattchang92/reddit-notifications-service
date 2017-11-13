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
        // console.log(content);
        resolve(content);
      } else {
        reject(err);
      }
    })
  })
);

const apiPost = (endpoint, headers, body) => (
  request({
    method: "POST",
    url: endpoint,
    headers,
    // headers: JSON.stringify(headers),
    body: JSON.stringify(body)
  }, (err, response, body) => {
    console.log('body', body);
    return body;
  })
);


module.exports = {
	apiGet,
	apiPost,
};
