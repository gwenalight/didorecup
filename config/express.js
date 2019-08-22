const fs = require('fs');
const helpers = require('./helpers');
const express = require('express');
const app = express();
const context = JSON.parse(fs.readFileSync(helpers.root('./src/boot/context/context.json')).toString());
const compression = require('compression');

app.use(compression());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('dist'));

app.get('/appconf/context.json', function (req, res) {
  res.send(context);
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
