const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'http://localhost:3001',
  issuerBaseURL: 'https://dev-qsskpalqd7swrrb7.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;