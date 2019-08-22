'use strict';

module.exports = {
  contentBase: 'src/',
  port: 3000,
  host: 'localhost',
  inline: true,
  open: 'chrome',
  historyApiFallback: true,
  watchOptions: {
    ignored: /node_modules/
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-xsrf-token,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-RequestID,Authorization,X-SessionID,location",
    "Access-Control-Expose-Headers": "Access-Control-Allow-Origin,Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "10"
  },
  proxy: {
    '/api/*': {
      //cookieDomainRewrite: "localhost",
      proxyTimeout: 120000,
      // le backend REST doit avoir la propriete server.contextPath: /api et server.port: 8080
      // Attention, pas de context root supplementaire pour fonctionner avec le cookie de tomcat (statefull)
      target: 'http://localhost:8080/',
      secure: false // check SSL certif
    }
  },
  quiet: false,
  noInfo: false,
  stats: {colors: true}
};
