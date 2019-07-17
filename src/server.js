const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');

module.exports = {
  app: function () {
    const app = express();
    app.use(proxy('/', { target: 'http://localhost:3000/' }));
    return app
  }
};