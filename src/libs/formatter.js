module.exports.formatResponseError = (req, status, message) => ({
  details: {
    uuid: req.uuid, method: req.method, url: req.originalUrl, status
  },
  msg: `Error ${status} (${message}).`
});

module.exports.formatResponseSuccess = (req, status) => ({
  details: {
    uuid: req.uuid, method: req.method, url: req.originalUrl, status
  },
  msg: `Success ${status}.`
});
