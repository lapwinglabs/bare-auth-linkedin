/**
 * Module Dependencies
 */

var LinkedIn = require('linkedin-oauth-agent');
var superagent = require('superagent');
var assign = require('object-assign');

/**
 * Export `linkedin`
 */

module.exports = linkedin;

/**
 * Defaults
 */

var defaults = {
  redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host,
  url: ''
};

/**
 * LinkedIn
 */

function linkedin(options) {
  return function _linkedin(fn) {
    options = assign(defaults, options);
    LinkedIn(options, function(err, code) {
      if (err) return fn(err);

      var obj = assign({
        code: code,
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri
      })

      superagent.post(options.url + '/auth/linkedin')
        .send(obj)
        .end(function(err, res) {
          if (err) return fn(err);
          return fn(null, res.body || res.text);
        });
    })
  }
}
