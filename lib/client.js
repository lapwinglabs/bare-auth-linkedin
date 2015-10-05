/**
 * Module Dependencies
 */

var LinkedIn = require('linkedin-oauth-agent');
var superagent = require('superagent');
var assign = require('object-assign');
var location = document.location;

/**
 * Export `linkedin`
 */

module.exports = linkedin;

/**
 * Default Redirect URL
 *
 * This is what you would put into the "Authorized redirect URIs" in:
 * - https://www.linkedin.com/developer/apps/{{APP_ID}}/auth
 */

/**
 * Defaults
 */

var defaults = {
  redirect_uri: location.href
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
