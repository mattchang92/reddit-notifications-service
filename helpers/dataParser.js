const requestsHelper = require('./requests');
// const config = require('../config.json');

class DataParser {
  constructor(config) {
    this.config = config;
    this.redditData = this.fetchData()
  }

  fetchData() {
    const data = {};
    this.config.subreddits.forEach(async (sub) => {
      const newSubData = await requestsHelper.apiGet(`https://www.reddit.com/r/${sub}/new/.json?count=25`);
      const topSubData = await requestsHelper.apiGet(`https://www.reddit.com/r/${sub}/top/.json?count=25`);
      data[sub] = [...newSubData, ...topSubData];
    })

    return data;  
  }

  postMatchesCriteria(title, keywordList1, keywordList2) {
    return keywordList1.some((keyword) => title.includes(keyword.toLowerCase())) && keywordList2.some((keyword) => title.includes(keyword.toLowerCase()));
  }

  getMatchingResults() {
    const matchingResults = [];
    this.config.itemsOfInterest.forEach((item) => {
      item.subredditsToCheck.forEach((subreddit) => {
        this.redditData[subreddit].forEach((subredditPost) => {
          if (this.postMatchesCriteria(subredditPost.title.toLowerCase(), item.keywordList1, item.keywordList2)) {
            matchingResults.push(subredditPost);
          }
        })
      })
    })

    return matchingResults;
  }
}

module.exports = DataParser;