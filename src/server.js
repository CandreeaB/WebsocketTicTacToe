const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');

module.exports = {
  app: function () {
    const app = express();
    // const indexPath = path.join('./bundle.js');
    // const publicPath = express.static(path.join(__dirname, '../public'));

    console.log("in server.js, public path is: ", path.join(__dirname));

    app.use(proxy('/', { target: 'http://localhost:3000/' }));
    // app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app
  }
};