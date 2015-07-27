
# bare-auth-linkedin

  LinkedIn authentication with [Bare Auth](https://github.com/lapwinglabs/bare-auth).

## Usage

**client.js:**

```js
var LinkedIn = require('linkedin-bare-auth');
var linkedin = LinkedIn({
  url: 'http://auth.example.com'
  client_id: linkedin_client_id,
  scope: ['profile']
})

linkedin(function(err, profile) {
  if (err) throw err;
  console.log(profile);
});
```

**server.js (using express):**

```js
var LinkedIn = require('linkedin-bare-auth');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');

var app = module.exports = express();

app.use(cors());
app.use(bodyParser.json());

app.use(LinkedIn({
  client_secret: client_secret
  // optionally include a 'sign' function to add support for JWT
}));

app.listen(5000);
```

## License

MIT

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
