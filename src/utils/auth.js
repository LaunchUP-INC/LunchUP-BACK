const { auth } = require('express-oauth2-jwt-bearer');
require("dotenv").config();
const { AUDIENCE, ISSUER_BASE_URL, JWT_TOKEN } = process.env;

const jwtCheck = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
  tokenSigningAlg: JWT_TOKEN
});

module.exports = jwtCheck;