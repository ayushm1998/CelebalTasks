const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  // const key=req.params.id
  if (req.method !== "GET") {
    // cache.set(key,'',duration)
    console.error("Cannot cache non get methods");
    return next();
  }

  const key = req.originalUrl;

  const cacheResponse = cache.get(key);

  if (cacheResponse) {
    console.log(`Cache hit for ${key}`);
    res.send(cacheResponse);
  } else {
    console.log(`Cache miss for ${key}`);
    console.log(key);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
