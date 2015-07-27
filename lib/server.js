/**
 * Module Dependencies
 */

var LinkedIn = require('linkedin-oauth-agent');

/**
 * Export `linkedin`
 */

module.exports = linkedin;

/**
 * LinkedIn authentication middleware
 *
 * @param {Object} options
 * @return {Function}
 */

function linkedin(options) {
  return function (req, res, next) {
    if (req.method != 'POST' || req.path != '/auth/linkedin') {
      return next();
    }

    var body = req.body;
    var sign = options.sign;

    LinkedIn({
      code: body.code,
      client_id: body.client_id,
      client_secret: options.client_secret,
      redirect_uri: body.redirect_uri,
    }, function(err, profile) {
      if (err) return res.status(500).send({ error: err.message });
      sign ? res.send(sign(profile)) : res.send(profile);
    })
  }
}
