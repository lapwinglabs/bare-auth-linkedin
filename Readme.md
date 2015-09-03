
# bare-auth-linkedin

  LinkedIn authentication with [Bare Auth](https://github.com/lapwinglabs/bare-auth).

## Installation

```
npm install bare-auth-linkedin
```

## Setup

##### 1. Create an App

Go to: https://www.linkedin.com/developer/apps to get started

##### 2. Add a valid Redirect URI

- Go to: https://www.linkedin.com/developer/apps/{{APP_ID}}/auth
- Add a redirect URL with the following format: `{{ORIGIN}}/auth/`. Example: `http://localhost:7000/auth/` or `https://app.finbox.io/auth/`

> **Important:** Don't forget to add the trailing slash as part of the valid redirect URI.

##### 3. Setup the client-side

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

##### 4. Setup the server-side (example using express)

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
