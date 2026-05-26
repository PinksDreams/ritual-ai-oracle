let cache = {
  data: null,
  lastUpdate: 0
};

const TTL = 2 * 60 * 1000; // 2 минуты

function getCache() {
  return cache;
}

function setCache(data) {
  cache = {
    data,
    lastUpdate: Date.now()
  };
}

function isExpired() {
  return Date.now() - cache.lastUpdate > TTL;
}

module.exports = {
  getCache,
  setCache,
  isExpired
};