const https = require('https');
const axios = require('axios');

const namespacesApi = require('./namespaces');
const functionsApi = require('./functions');
const containersApi = require('./containers');
const triggersApi = require('./triggers');
const jwtApi = require('./jwt');
const logsApi = require('./logs');

// Registry
const RegistryApi = require('./registry');

function getApiManager(apiUrl, token) {
  return axios.create({
    baseURL: apiUrl,
    headers: {
      'X-Auth-Token': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
}

class Api {
  constructor(apiUrl, token) {
    this.apiManager = getApiManager(apiUrl, token);
    Object.assign(
      this,
      namespacesApi,
      functionsApi,
      containersApi,
      triggersApi,
      jwtApi,
      logsApi,
    );
  }
}

module.exports = {
  getApiManager,
  Api,
  RegistryApi,
};
