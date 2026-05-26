let latestNews = [];

function setNews(data) {
  latestNews = data;
}

function getNews() {
  return latestNews;
}

module.exports = { setNews, getNews };